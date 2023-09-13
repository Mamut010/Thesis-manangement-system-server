import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { ActionType } from "../../types/action-type";
import { groupBy, singleOrDefault, singleOrThrow, sortByKeyArray } from "../../../../../utils/array-helpers";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { StateType } from "../../types/state-type";
import { ActivityType } from "../../types/activity-type";
import { PlainActivity, PlainRequestAction, PlainRequestStakeholder } from "../../types/plains";
import { 
    ActivityEffect, 
    ActivityHandlerInputWithoutTarget, 
    ActivityTypeWithTarget,
    Stakeholder
} from "../../types/utility-types";
import { ActionHandlerInput } from "../../action-handlers";
import { ActivityHandlerInput } from "../../activity-handlers";
import { RequestStateDto, RequestUsersDto } from "../../types/dtos";
import { Target } from "../../types/targets";
import { RequestAdvanceOptions, RequestCreateOptions } from "../../types/options";
import { WorkflowEngineInterface } from "../interfaces/workflow-engine.interface";
import { WorkflowCoreFactoryInterface } from "../../core-factories";
import { PrismaClientLike } from "../../../../../utils/types";

@injectable()
export class WorkflowEngine implements WorkflowEngineInterface {
    private static readonly ACTIVITIES_SELECT = {
        select: {
            activityType: {
                select: {
                    name: true
                }
            },
            activityTargets: {
                select: {
                    target: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
        }
    } as const;

    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.WorkflowCoreFactory) private coreFactory: WorkflowCoreFactoryInterface)
    {

    }

    async getRequestStates(actionerId: string, requestIds: string[]): Promise<RequestStateDto[]> {
        const requestsWithTarget = await this.getRequestsAndTarget(requestIds, actionerId);
        return requestsWithTarget
            .map(({ request, target }) => {
                return {
                    id: request.id,
                    processId: request.processId,
                    stateType: request.state.stateType.name as StateType,
                    state: request.state.name,
                    stateDescription: request.state.description,
                    actionTypes: request.requestActions
                        .flatMap(item => 
                            item.action.actionTargets.some(actionTarget => actionTarget.target.name === target)
                                ? item.action.actionType.name as ActionType
                                : []
                        ),
            }
        });
    }

    async getRequestState(actionerId: string, requestId: string): Promise<RequestStateDto | null> {
        return singleOrDefault(await this.getRequestStates(actionerId, [requestId]), null);
    }

    async createRequest(createOptions: RequestCreateOptions): Promise<RequestStateDto | null> {
        const initialState = await this.getProcessInitialState(createOptions.processId);
        if (!initialState) {
            return null;
        }

        const activityEffects: ActivityEffect[] = [];
        const request = await this.prisma.$transaction(async (tx) => {
            const request = await tx.request.create({
                data: {
                    ...createOptions,
                    stateId: initialState.id,
                    requestStakeholders: {
                        create: {
                            userId: createOptions.userId,
                            isAccepted: true,
                        }
                    }
                }
            });
    
            const stateEffect = await this.handleRequestEnteringState(tx, request.id, request.stateId, {
                requestUsers: {
                    requesterId: createOptions.userId,
                    requestStakeholders: [{
                        userId: createOptions.userId,
                        isAccepted: true
                    }]
                },
            });
            activityEffects.push(stateEffect);

            return request;
        });
        
        await this.handleActivityEffects(activityEffects);

        return await this.getRequestState(createOptions.userId, request.id);
    }

    async advanceRequest(advanceOptions: RequestAdvanceOptions): Promise<RequestStateDto | null> {
        const { requestId, actionerId, actionType, data } = advanceOptions;
        const { request, target } = singleOrThrow(await this.getRequestsAndTarget([requestId], actionerId));
        if (!request || !target) {
            return null;
        }

        const validRequestActions = this.getValidRequestAction(request.requestActions, actionType, target);
        if (validRequestActions.length === 0) {
            return null;
        }

        const requestUsers: RequestUsersDto = {
            requesterId: request.userId,
            requestStakeholders: this.constructStakeholdersFromPlains(request.requestStakeholders)
        };
        const actionOutput = await this.handleAction(actionType, requestId, { requestUsers, actionerId, target, data });
        if (!actionOutput) {
            return null;
        }

        const validRequestActionIds = validRequestActions.map(item => item.id);
        const activityEffects = await this.updateRequestActions(requestId, request.requestActions, validRequestActionIds, {
            requestUsers,
            actionerId,
            target,
            actionResolvedUserIds: actionOutput.resolvedUserIds,
        });
        await this.handleActivityEffects(activityEffects);

        return await this.getRequestState(actionerId, requestId);
    }

    private async getProcessInitialState(processId: string) {
        return await this.prisma.state.findFirst({
            where: {
                processId: processId,
                stateType: {
                    name: StateType.Initial
                }
            },
            select: {
                id: true,
            }
        });
    }

    private async getRequests(requestIds: string[]) {
        const requests = await this.prisma.request.findMany({
            where: {
                id: {
                    in: requestIds
                }
            },
            select: {
                id: true,
                userId: true,
                processId: true,
                data: {
                    select: {
                        name: true,
                        value: true,
                    }
                },
                state: {
                    select: {
                        name: true,
                        description: true,
                        stateType: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                requestActions: {
                    where: {
                        isActive: true,
                        isCompleted: false,
                    },
                    select: {
                        id: true,
                        transitionId: true,
                        action: {
                            select: {
                                actionType: {
                                    select: {
                                        name: true
                                    }
                                },
                                actionTargets: {
                                    select: {
                                        target: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        transition: {
                            select: {
                                nextStateId: true
                            }
                        }
                    }
                },
                requestStakeholders: {
                    select: {
                        userId: true,
                        group: {
                            select: {
                                id: true,
                                name: true,
                                users: {
                                    select: {
                                        userId: true
                                    }
                                }
                            }
                        },
                        isAccepted: true,
                    }
                }
            }
        });

        return sortByKeyArray(requests, requestIds, (request) => request.id);
    }

    private async getRequestsAndTarget(requestIds: string[], actionerId: string) {
        const requests = await this.getRequests(requestIds);
        return await Promise.all(requests.map(async (request) => {
            const targetIdentifier = this.coreFactory.createTargetIdentifier();
            const targetOutput = request 
                ? await targetIdentifier.identifyTarget(actionerId, { 
                    creatorId: request.userId,
                    requestStakeholders: this.constructStakeholdersFromPlains(request.requestStakeholders),
                    requestData: request.data,
                }) 
                : undefined;
            return {
                request,
                target: targetOutput?.target
            }
        }));
    }

    private async updateRequestActions(requestId: string, plainRequestActions: PlainRequestAction[],
        validRequestActionIds: string[], activityInput: ActivityHandlerInput) {
        const { fulfilledTransition } = this.getFulfilledTransition(plainRequestActions, validRequestActionIds);

        const activityEffects: ActivityEffect[] = [];
        await this.prisma.$transaction(async (tx) => {
            await tx.requestAction.updateMany({
                where: {
                    id: {
                        in: validRequestActionIds
                    }
                },
                data: {
                    isActive: false,
                    isCompleted: true,
                }
            });

            if (fulfilledTransition) {
                const transitionEffect = await this.handleRequestFulfillingTransition(tx, requestId, 
                    fulfilledTransition.transitionId, activityInput);
                const stateEffect = await this.handleRequestEnteringState(tx, requestId, fulfilledTransition.nextStateId, 
                    activityInput);
                activityEffects.push(transitionEffect);
                activityEffects.push(stateEffect);
            }
        });
        
        return activityEffects;
    }

    private async handleActivityEffects(activityEffects: ActivityEffect[]) {
        if (activityEffects.length > 0) {
            await Promise.all(activityEffects.map(activityEffect => activityEffect()));
        }
    }

    private getValidRequestAction(requestActions: PlainRequestAction[], actionType: ActionType, target: string) {
        return requestActions.filter(requestAction => {
            return requestAction.action.actionType.name === actionType
                // ActionTarget with multiple targets are treated as an OR operation
                && requestAction.action.actionTargets.some(actionTarget => actionTarget.target.name === target)
        });
    }

    private getFulfilledTransition(requestActions: PlainRequestAction[], validRequestActionIds: string[]) {
        // Iterate over all request actions that are grouped by transitionId and get all distinct transitionId
        // along with getting the transitionId of the transition that are fulfilled by the action
        const transitionIds: string[] = [];
        const fulfilledTransitions = Array.from(groupBy(requestActions, 'transitionId'))
            .filter(([transitionId, requestActions]) => {
                transitionIds.push(transitionId);
                return requestActions.length === 1 && validRequestActionIds.includes(requestActions[0].id)
            })
            .map(([transitionId, requestActions]) => {
                return { 
                    transitionId, 
                    nextStateId: requestActions[0].transition.nextStateId
                };
            });

        // There should not be multiple fulfilled transitions at the same time
        if (fulfilledTransitions.length > 1) {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.DefaultMessage);
        }
        
        return {
            transitionIds: transitionIds,
            fulfilledTransition: singleOrDefault(fulfilledTransitions)
        };
    }

    private async handleRequestFulfillingTransition(prisma: PrismaClientLike, requestId: string, 
        fulfilledTransitionId: string, activityInput: ActivityHandlerInputWithoutTarget): Promise<ActivityEffect> {
        await this.renewRequestAction(prisma, requestId);

        const transition = await prisma.transition.findUniqueOrThrow({
            where: {
                id: fulfilledTransitionId,
            },
            select: {
                activities: WorkflowEngine.ACTIVITIES_SELECT,
            }
        });

        return async () => {
            const activityTypeWithTargets = this.constructActivityTypeWithTargetsFromActivities(transition.activities);
            await this.handleActivity(activityTypeWithTargets, requestId, activityInput);
        };
    }

    private async handleRequestEnteringState(prisma: PrismaClientLike, requestId: string, 
        stateId: string, activityInput: ActivityHandlerInputWithoutTarget): Promise<ActivityEffect> {
        const state = await prisma.state.findUniqueOrThrow({
            where: {
                id: stateId
            },
            select: {
                outTransitions: {
                    select: {
                        id: true,
                        actions: {
                            select: {
                                id: true,
                            }
                        }
                    }
                },
                activities: WorkflowEngine.ACTIVITIES_SELECT,
            }
        });

        const transitionActionIds = state.outTransitions.flatMap(transition => {
            return transition.actions.map(action => {
                return {
                    transitionId: transition.id,
                    actionId: action.id,
                }
            })
        });

        await prisma.request.update({
            where: {
                id: requestId,
            },
            data: {
                stateId: stateId,
                requestActions: {
                    createMany: {
                        data: transitionActionIds
                    }
                }
            }
        });

        return async () => {
            const activityTypeWithTargets = this.constructActivityTypeWithTargetsFromActivities(state.activities);
            await this.handleActivity(activityTypeWithTargets, requestId, activityInput);
        };
    }

    private async handleAction(actionType: ActionType, requestId: string, actionInput: ActionHandlerInput) {
        const handler = this.coreFactory.createActionHandler(actionType);
        return await handler?.handle(requestId, actionInput);
    }

    private async handleActivity(activityTypeWithTargets: ActivityTypeWithTarget[], requestId: string, 
        activityInput: ActivityHandlerInputWithoutTarget) {
        return await Promise.all(activityTypeWithTargets.map(async (item) => {
            const handler = this.coreFactory.createActivityHandler(item.activityType);
            return await handler?.handle(requestId, { ...activityInput, target: item.target });
        }));
    }

    private async renewRequestAction(prisma: PrismaClientLike, requestId: string) {
        await prisma.requestAction.deleteMany({
            where: {
                requestId: requestId,
            }
        });
    }

    private constructActivityTypeWithTargetsFromActivities(activities: PlainActivity[]): ActivityTypeWithTarget[] {
        return activities.flatMap(activity => {
            return activity.activityTargets.map(activityTarget => {
                return {
                    activityType: activity.activityType.name as ActivityType,
                    target: activityTarget.target.name as Target,
                }
            })
        });
    }

    private constructStakeholdersFromPlains(plains: PlainRequestStakeholder[]): Stakeholder[] {
        return plains
            .filter(item => item.userId !== null || item.group !== null)
            .map<Stakeholder>(({ userId, group, isAccepted }) => {
                if (group !== null) {
                    return { 
                        groupId: group.id,
                        memberIds: group.users.map(user => user.userId),
                        isAccepted,
                    };
                }

                return {
                    userId: userId!,
                    isAccepted,
                };
            });
    }
}