/*
  Warnings:

  - You are about to drop the column `step` on the `BachelorThesisAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `OralDefenseAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_thesisId_fkey`;

-- AlterTable
ALTER TABLE `BachelorThesisAssessment` DROP COLUMN `step`;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` DROP COLUMN `step`,
    ADD COLUMN `adminAllowed` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` DROP COLUMN `step`;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `step`,
    ADD COLUMN `adminAllowed` BOOLEAN NULL,
    ADD COLUMN `adminId` VARCHAR(191) NULL,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
