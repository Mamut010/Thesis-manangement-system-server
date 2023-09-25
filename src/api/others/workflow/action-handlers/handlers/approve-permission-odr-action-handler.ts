import { inject, injectable } from "inversify";
import { ActionHandlerInput } from "../types";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { 
    OralDefenseRegistrationRepoInterface,
    StudentAttemptRepoInterface,
} from "../../../../../dal/interfaces";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { StudentAttemptDto } from "../../../../../shared/dtos";

@injectable()
export class ApprovePermissionODRActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput): Promise<void> {
        if (typeof studentAttempt.oralDefenseRegistrationId === 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RequestAlreadyAssociatedWithForm);
        }

        await this.odrRepo.create({ 
            studentId: actionInput.requestUsers.requesterId,
            attemptNo: studentAttempt.attemptNo,
        });
    }
}