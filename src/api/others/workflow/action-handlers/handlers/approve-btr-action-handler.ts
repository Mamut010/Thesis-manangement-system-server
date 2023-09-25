import { inject, injectable } from "inversify";
import { ActionHandlerInput } from "../types";
import { BachelorThesisRegistrationRepoInterface, StudentAttemptRepoInterface } from "../../../../../dal/interfaces";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { Target } from "../../types/targets";
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { StudentAttemptDto } from "../../../../../shared/dtos";

@injectable()
export class ApproveBTRActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput): Promise<void> {
        if (typeof studentAttempt.bachelorThesisRegistrationId !== 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredNumberRequestData);
        }

        if (actionInput.target === Target.Supervisor1) {
            await this.btrRepo.update(studentAttempt.bachelorThesisRegistrationId, {
                supervisor1Date: new Date(),
            });
        }
        else if (actionInput.target === Target.Supervisor2) {
            await this.btrRepo.update(studentAttempt.bachelorThesisRegistrationId, {
                supervisor2Date: new Date(),
            });
        }
    }
}