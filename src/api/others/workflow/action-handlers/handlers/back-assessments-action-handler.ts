import { inject, injectable } from "inversify";
import { BaseStudentAttemptActionHandler } from "../bases/base-student-attempt-action-handler";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentRepoInterface,
    OralDefenseAssessmentRepoInterface,
    StudentAttemptRepoInterface 
} from "../../../../../dal/interfaces";
import { StudentAttemptDto } from "../../../../../shared/dtos";
import { ActionHandlerInput } from "../types";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { Target } from "../../types/targets";

@injectable()
export class BackAssessmentsActionHandler extends BaseStudentAttemptActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.StudentAttemptRepo) studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface) {
        super(studentAttemptRepo);
    }

    protected async execute(requestId: string, studentAttempt: StudentAttemptDto, actionInput: ActionHandlerInput): Promise<void> {
        if (typeof studentAttempt.oralDefenseRegistrationId !== 'number') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredNumberRequestData);
        }

        if (actionInput.target === Target.Supervisor1) {
            await this.btaRepo.update(studentAttempt.oralDefenseRegistrationId, {
                supervisor1Confirmed: false,
            });
            await this.odaRepo.update(studentAttempt.oralDefenseRegistrationId, {
                supervisor1Confirmed: false,
            });
        }
        else if (actionInput.target === Target.Supervisor2) {
            await this.btaRepo.update(studentAttempt.oralDefenseRegistrationId, {
                supervisor2Confirmed: false,
            });
            await this.odaRepo.update(studentAttempt.oralDefenseRegistrationId, {
                supervisor2Confirmed: false,
            });
        }
    }
}