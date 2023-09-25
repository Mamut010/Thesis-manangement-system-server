import { inject, injectable } from "inversify";
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { OralDefenseRegistrationRepoInterface, StudentAttemptRepoInterface } from "../../../../../dal/interfaces";
import { StudentAttemptDto } from "../../../../../shared/dtos";
import { ActionHandlerInput } from "../types";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { Target } from "../../types/targets";

@injectable()
export class ConfirmODRActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput): Promise<void> {
        if (typeof studentAttempt.oralDefenseRegistrationId !== 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredNumberRequestData);
        }

        if (actionInput.target === Target.Requester) {
            await this.odrRepo.update(studentAttempt.oralDefenseRegistrationId, {
                studentConfirmed: true,
            });
        }
        else if (actionInput.target === Target.AdminGroup) {
            await this.odrRepo.update(studentAttempt.oralDefenseRegistrationId, {
                adminConfirmed: true,
            });
        }
    }
}