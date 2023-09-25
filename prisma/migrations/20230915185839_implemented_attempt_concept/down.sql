-- DropForeignKey
ALTER TABLE `StudentAttempt` DROP FOREIGN KEY `StudentAttempt_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentAttempt` DROP FOREIGN KEY `StudentAttempt_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentAttempt` DROP FOREIGN KEY `StudentAttempt_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `Thesis` DROP FOREIGN KEY `Thesis_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_studentAttemptId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_studentAttemptId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_studentAttemptId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_studentAttemptId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisEvaluation` DROP FOREIGN KEY `BachelorThesisEvaluation_studentAttemptId_fkey`;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` datetime NULL;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` DROP COLUMN `studentAttemptId`,
    ADD COLUMN `adminAllowed` BOOLEAN NULL,
    ADD COLUMN `adminConfirmed` BOOLEAN NULL,
    ADD COLUMN `adminId` VARCHAR(191) NULL,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supervisor1Confirmed` BOOLEAN NULL,
    ADD COLUMN `supervisor1Id` VARCHAR(191) NULL,
    ADD COLUMN `supervisor2Confirmed` BOOLEAN NULL,
    ADD COLUMN `supervisor2Id` VARCHAR(191) NULL,
    ADD COLUMN `thesisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `studentAttemptId`,
    ADD COLUMN `adminAllowed` BOOLEAN NULL,
    ADD COLUMN `adminId` VARCHAR(191) NULL,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supervisor1Id` VARCHAR(191) NULL,
    ADD COLUMN `supervisor2Id` VARCHAR(191) NULL,
    ADD COLUMN `thesisId` INTEGER NOT NULL,
    MODIFY `proposedDate` datetime NULL,
    MODIFY `actualDate` datetime NULL,
    MODIFY `dateReceived` datetime NULL,
    MODIFY `admissionDate` datetime NULL;

-- AlterTable
ALTER TABLE `BachelorThesisAssessment` DROP COLUMN `studentAttemptId`,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supervisor1Id` VARCHAR(191) NULL,
    ADD COLUMN `supervisor2Id` VARCHAR(191) NULL,
    ADD COLUMN `thesisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` DROP COLUMN `studentAttemptId`,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supervisor1Id` VARCHAR(191) NULL,
    ADD COLUMN `supervisor2Id` VARCHAR(191) NULL,
    ADD COLUMN `thesisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `BachelorThesisEvaluation` DROP COLUMN `studentAttemptId`,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `supervisorConfirmed` BOOLEAN NULL,
    ADD COLUMN `supervisorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `thesisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Transition` ADD COLUMN `processId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `StudentAttempt`;

-- CreateIndex
CREATE INDEX `User_roleId_fkey` ON `User`(`roleId` ASC);

-- CreateIndex
CREATE INDEX `Notification_senderId_fkey` ON `Notification`(`senderId` ASC);

-- CreateIndex
CREATE INDEX `Student_programId_fkey` ON `Student`(`programId` ASC);

-- CreateIndex
CREATE INDEX `Thesis_creatorId_fkey` ON `Thesis`(`creatorId` ASC);

-- CreateIndex
CREATE INDEX `Thesis_fieldId_fkey` ON `Thesis`(`fieldId` ASC);

-- CreateIndex
CREATE INDEX `Thesis_topicId_fkey` ON `Thesis`(`topicId` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisRegistration_adminId_fkey` ON `BachelorThesisRegistration`(`adminId` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `BachelorThesisRegistration_studentId_key` ON `BachelorThesisRegistration`(`studentId` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisRegistration_supervisor1Id_fkey` ON `BachelorThesisRegistration`(`supervisor1Id` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisRegistration_supervisor2Id_fkey` ON `BachelorThesisRegistration`(`supervisor2Id` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisRegistration_thesisId_fkey` ON `BachelorThesisRegistration`(`thesisId` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseRegistration_adminId_fkey` ON `OralDefenseRegistration`(`adminId` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `OralDefenseRegistration_studentId_key` ON `OralDefenseRegistration`(`studentId` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseRegistration_supervisor1Id_fkey` ON `OralDefenseRegistration`(`supervisor1Id` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseRegistration_supervisor2Id_fkey` ON `OralDefenseRegistration`(`supervisor2Id` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseRegistration_thesisId_fkey` ON `OralDefenseRegistration`(`thesisId` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `BachelorThesisAssessment_studentId_key` ON `BachelorThesisAssessment`(`studentId` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisAssessment_supervisor1Id_fkey` ON `BachelorThesisAssessment`(`supervisor1Id` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisAssessment_supervisor2Id_fkey` ON `BachelorThesisAssessment`(`supervisor2Id` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisAssessment_thesisId_fkey` ON `BachelorThesisAssessment`(`thesisId` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `OralDefenseAssessment_studentId_key` ON `OralDefenseAssessment`(`studentId` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseAssessment_supervisor1Id_fkey` ON `OralDefenseAssessment`(`supervisor1Id` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseAssessment_supervisor2Id_fkey` ON `OralDefenseAssessment`(`supervisor2Id` ASC);

-- CreateIndex
CREATE INDEX `OralDefenseAssessment_thesisId_fkey` ON `OralDefenseAssessment`(`thesisId` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `BachelorThesisEvaluation_studentId_key` ON `BachelorThesisEvaluation`(`studentId` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisEvaluation_supervisorId_fkey` ON `BachelorThesisEvaluation`(`supervisorId` ASC);

-- CreateIndex
CREATE INDEX `BachelorThesisEvaluation_thesisId_fkey` ON `BachelorThesisEvaluation`(`thesisId` ASC);

-- CreateIndex
CREATE INDEX `Request_processId_fkey` ON `Request`(`processId` ASC);

-- CreateIndex
CREATE INDEX `Request_stateId_fkey` ON `Request`(`stateId` ASC);

-- CreateIndex
CREATE INDEX `Request_userId_fkey` ON `Request`(`userId` ASC);

-- CreateIndex
CREATE INDEX `RequestNote_requestId_fkey` ON `RequestNote`(`requestId` ASC);

-- CreateIndex
CREATE INDEX `RequestNote_userId_fkey` ON `RequestNote`(`userId` ASC);

-- CreateIndex
CREATE INDEX `RequestFile_userId_fkey` ON `RequestFile`(`userId` ASC);

-- CreateIndex
CREATE INDEX `State_processId_fkey` ON `State`(`processId` ASC);

-- CreateIndex
CREATE INDEX `State_stateTypeId_fkey` ON `State`(`stateTypeId` ASC);

-- CreateIndex
CREATE INDEX `Transition_currentStateId_fkey` ON `Transition`(`currentStateId` ASC);

-- CreateIndex
CREATE INDEX `Transition_nextStateId_fkey` ON `Transition`(`nextStateId` ASC);

-- CreateIndex
CREATE INDEX `Transition_processId_fkey` ON `Transition`(`processId` ASC);

-- CreateIndex
CREATE INDEX `Action_actionTypeId_fkey` ON `Action`(`actionTypeId` ASC);

-- CreateIndex
CREATE INDEX `Action_processId_fkey` ON `Action`(`processId` ASC);

-- CreateIndex
CREATE INDEX `Activity_activityTypeId_fkey` ON `Activity`(`activityTypeId` ASC);

-- CreateIndex
CREATE INDEX `Activity_processId_fkey` ON `Activity`(`processId` ASC);

-- CreateIndex
CREATE INDEX `Group_processId_fkey` ON `Group`(`processId` ASC);

-- CreateIndex
CREATE INDEX `ActionTarget_actionId_fkey` ON `ActionTarget`(`actionId` ASC);

-- CreateIndex
CREATE INDEX `ActionTarget_targetId_fkey` ON `ActionTarget`(`targetId` ASC);

-- CreateIndex
CREATE INDEX `ActivityTarget_activityId_fkey` ON `ActivityTarget`(`activityId` ASC);

-- CreateIndex
CREATE INDEX `ActivityTarget_targetId_fkey` ON `ActivityTarget`(`targetId` ASC);

-- CreateIndex
CREATE INDEX `RequestAction_actionId_fkey` ON `RequestAction`(`actionId` ASC);

-- CreateIndex
CREATE INDEX `RequestAction_requestId_fkey` ON `RequestAction`(`requestId` ASC);

-- CreateIndex
CREATE INDEX `RequestAction_transitionId_fkey` ON `RequestAction`(`transitionId` ASC);

-- CreateIndex
CREATE INDEX `RequestStakeholder_groupId_fkey` ON `RequestStakeholder`(`groupId` ASC);

-- CreateIndex
CREATE INDEX `RequestStakeholder_requestId_fkey` ON `RequestStakeholder`(`requestId` ASC);

-- CreateIndex
CREATE INDEX `RequestStakeholder_userId_fkey` ON `RequestStakeholder`(`userId` ASC);

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Lecturer`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transition` ADD CONSTRAINT `Transition_processId_fkey` FOREIGN KEY (`processId`) REFERENCES `Process`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

