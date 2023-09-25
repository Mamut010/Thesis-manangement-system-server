import { inject, injectable } from "inversify";
import { ActionHandlerInput } from "../types";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { BachelorThesisRegistrationRepoInterface, StudentAttemptRepoInterface } from "../../../../../dal/interfaces";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { StudentAttemptDto } from "../../../../../shared/dtos";

@injectable()
export class RejectBTRActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto ,actionInput: ActionHandlerInput): Promise<void> {
        if (typeof studentAttempt.bachelorThesisRegistrationId !== 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredNumberRequestData);
        }

        await this.btrRepo.update(studentAttempt.bachelorThesisRegistrationId, { 
            studentConfirmed: false,
            adminConfirmed: false,
            supervisor1Date: null,
            supervisor2Date: null,
        });
    }
}