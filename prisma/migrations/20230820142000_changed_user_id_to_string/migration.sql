/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_userId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisEvaluation` DROP FOREIGN KEY `BachelorThesisEvaluation_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisEvaluation` DROP FOREIGN KEY `BachelorThesisEvaluation_supervisorId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `Lecturer` DROP FOREIGN KEY `Lecturer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_senderId_fkey`;

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

-- DropForeignKey
ALTER TABLE `RefreshToken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_userId_fkey`;

-- AlterTable
ALTER TABLE `Admin` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `BachelorThesisAssessment` MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `supervisor1Id` VARCHAR(191) NULL,
    MODIFY `supervisor2Id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `BachelorThesisEvaluation` MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `supervisorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `supervisor1Id` VARCHAR(191) NULL,
    MODIFY `supervisor2Id` VARCHAR(191) NULL,
    MODIFY `adminId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Lecturer` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `senderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `supervisor1Id` VARCHAR(191) NULL,
    MODIFY `supervisor2Id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `supervisor1Id` VARCHAR(191) NULL,
    MODIFY `supervisor2Id` VARCHAR(191) NULL,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Student` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
