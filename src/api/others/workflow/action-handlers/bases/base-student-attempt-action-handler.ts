import { BaseActionHandler } from "../bases/base-action-handler";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { StudentAttemptRepoInterface } from "../../../../../dal/interfaces";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { StudentAttemptDto } from "../../../../../shared/dtos";

export abstract class BaseStudentAttemptActionHandler extends BaseActionHandler {
    constructor(protected studentAttemptRepo: StudentAttemptRepoInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const studentAttempt = await this.studentAttemptRepo.findOneByRequestId(requestId);
        if (!studentAttempt) {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RequestNotAssociatedWithStudentAttempt);
        }

        const executionResult = await this.execute(requestId, studentAttempt, actionInput);

        return executionResult ?? {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId]
        };
    }

    protected abstract execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput | void> | ActionHandlerOutput | void;
}