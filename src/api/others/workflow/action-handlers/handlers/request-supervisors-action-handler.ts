import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    RequestDataRepoInterface, 
    StudentAttemptRepoInterface 
} from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from '../../request-data-processor';
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { StudentAttemptDto } from "../../../../../shared/dtos";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getRequestDataStringValueByKey } from "../../utils/request-data-helpers";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";

@injectable()
export class RequestSupervisorsActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.RequestDataRepo) private requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) private requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput> {
        if (typeof studentAttempt.bachelorThesisAssessmentId === 'number' 
            || typeof studentAttempt.oralDefenseAssessmentId === 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RequestAlreadyAssociatedWithForm);
        }
        
        await this.createAssessments(actionInput.requestUsers.requesterId, studentAttempt.attemptNo);

        const supervisorIds = await this.getSupervisorIds(requestId);

        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: supervisorIds,
            ...getTitleAndContentFromData(actionInput.data),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId, ...supervisorIds]
        };
    }

    private async createAssessments(studentId: string, attemptNo: number): Promise<void> {
        await this.btaRepo.create({ studentId, attemptNo });
        await this.odaRepo.create({ studentId, attemptNo });
    }

    private async getSupervisorIds(requestId: string) {
        return Promise.all(
            [STORED_REQUEST_DATA_KEYS.Supervisor1, STORED_REQUEST_DATA_KEYS.Supervisor2]
            .map(async (item) => {
                const id = await getRequestDataStringValueByKey(requestId, item, {
                    repo: this.requestDataRepo, 
                    processor: this.requestDataProcessor
                });
                if (typeof id === 'undefined') {
                    throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredStringRequestData);
                }
                return id;
            }
        ));
    }
}