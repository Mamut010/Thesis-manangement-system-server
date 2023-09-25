/*
  Warnings:

  - You are about to drop the column `title` on the `BachelorThesisEvaluation` table. All the data in the column will be lost.
  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `concernedAgreed` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `BachelorThesisAssessment` ADD COLUMN `supervisor1Confirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `supervisor2Confirmed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `BachelorThesisEvaluation` DROP COLUMN `title`;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` ADD COLUMN `adminConfirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `studentConfirmed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` ADD COLUMN `supervisor1Confirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `supervisor2Confirmed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` ADD COLUMN `adminConfirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `studentConfirmed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `concernedAgreed` BOOLEAN NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `sex` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;
