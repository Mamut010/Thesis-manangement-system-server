-- AlterTable
ALTER TABLE `Student` DROP COLUMN `sex`;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` datetime NULL;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` DROP COLUMN `adminConfirmed`,
    DROP COLUMN `studentConfirmed`;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `adminConfirmed`,
    DROP COLUMN `studentConfirmed`,
    MODIFY `proposedDate` datetime NULL,
    MODIFY `actualDate` datetime NULL,
    MODIFY `concernedAgreed` int NULL DEFAULT 0,
    MODIFY `dateReceived` datetime NULL,
    MODIFY `admissionDate` datetime NULL;

-- AlterTable
ALTER TABLE `BachelorThesisAssessment` DROP COLUMN `supervisor1Confirmed`,
    DROP COLUMN `supervisor2Confirmed`;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` DROP COLUMN `supervisor1Confirmed`,
    DROP COLUMN `supervisor2Confirmed`;

-- AlterTable
ALTER TABLE `BachelorThesisEvaluation` ADD COLUMN `title` VARCHAR(255) NULL;

-- CreateIndex
CREATE INDEX `User_roleId_fkey` ON `User`(`roleId` ASC);

-- CreateIndex
CREATE INDEX `Notification_senderId_fkey` ON `Notification`(`senderId` ASC);

-- CreateIndex
CREATE INDEX `Student_programId_fkey` ON `Student`(`programId` ASC);

-- CreateIndex
CREATE INDEX `StudentAttempt_supervisor2Id_fkey` ON `StudentAttempt`(`supervisor2Id` ASC);

-- CreateIndex
CREATE INDEX `StudentAttempt_thesisId_fkey` ON `StudentAttempt`(`thesisId` ASC);

-- CreateIndex
CREATE INDEX `Thesis_creatorId_fkey` ON `Thesis`(`creatorId` ASC);

-- CreateIndex
CREATE INDEX `Thesis_fieldId_fkey` ON `Thesis`(`fieldId` ASC);

-- CreateIndex
CREATE INDEX `Thesis_topicId_fkey` ON `Thesis`(`topicId` ASC);

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

