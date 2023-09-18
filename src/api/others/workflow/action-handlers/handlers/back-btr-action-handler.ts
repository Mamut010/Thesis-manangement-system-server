import { inject, injectable } from "inversify";
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { BachelorThesisRegistrationRepoInterface, StudentAttemptRepoInterface } from "../../../../../dal/interfaces";
import { StudentAttemptDto } from "../../../../../shared/dtos";
import { ActionHandlerInput } from "../types";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { Target } from "../../types/targets";

@injectable()
export class BackBTRActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput): Promise<void> {
        if (typeof studentAttempt.bachelorThesisAssessmentId !== 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredNumberRequestData);
        }

        if (actionInput.target === Target.Requester) {
            await this.btrRepo.update(studentAttempt.bachelorThesisAssessmentId, {
                studentConfirmed: false,
            });
        }
        else if (actionInput.target === Target.AdminGroup) {
            await this.btrRepo.update(studentAttempt.bachelorThesisAssessmentId, {
                adminConfirmed: false,
            });
        }
    }
}