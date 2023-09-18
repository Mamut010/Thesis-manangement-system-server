import { inject, injectable } from "inversify";
import { BaseActionHandler } from "../bases/base-action-handler";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { 
    BachelorThesisRegistrationRepoInterface, 
    RequestDataRepoInterface, 
    StudentAttemptRepoInterface,
} from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { getRequestDataValuesByKeys } from "../../utils/request-data-helpers";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getElementWithLatestAttemptNo } from "../../../../../utils/attempt-helpers";

@injectable()
export class ApprovePermissionBTRActionHandler extends BaseActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) private requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.StudentAttemptRepo) private studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) private requestDataProcessor: WorkflowRequestDataProcessorInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const studentId = actionInput.requestUsers.requesterId;
        const { thesisId, supervisor2Id } = await this.getThesisIdAndSupervisor2IdFromRequest(requestId);
        const attemptNo = await this.getStudentAttemptNo(studentId);

        await this.studentAttemptRepo.create({ studentId, attemptNo, thesisId, supervisor2Id, requestId });
        await this.btrRepo.create({ studentId, attemptNo });
        await this.requestDataRepo.create(requestId, {
            name: STORED_REQUEST_DATA_KEYS.AttemptNo,
            value: this.requestDataProcessor.makeStoredValue(attemptNo),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId]
        };
    }

    private async getThesisIdAndSupervisor2IdFromRequest(requestId: string) {
        const requestData = await getRequestDataValuesByKeys(requestId, [STORED_REQUEST_DATA_KEYS.Thesis, 
            STORED_REQUEST_DATA_KEYS.Supervisor2], { repo: this.requestDataRepo, processor: this.requestDataProcessor });

        const thesisId = requestData[STORED_REQUEST_DATA_KEYS.Thesis];
        if (typeof thesisId !== 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredNumberRequestData);
        }
        const supervisor2Id = requestData[STORED_REQUEST_DATA_KEYS.Supervisor2];
        if (typeof supervisor2Id !== 'string') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredStringRequestData);
        }

        return {
            thesisId,
            supervisor2Id,
        }
    }

    private async getStudentAttemptNo(studentId: string): Promise<number> {
        const attempts = await this.studentAttemptRepo.findManyByStudentId(studentId);
        const latestAttempt = getElementWithLatestAttemptNo(attempts, attempt => attempt.attemptNo)?.attemptNo ?? 0;
        return latestAttempt + 1;
    }
}