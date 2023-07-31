/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `receivingDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_studentId_fkey`;

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

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `receivingDate` DATETIME NULL,
    MODIFY `submissionDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
