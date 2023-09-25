/*
  Warnings:

  - You are about to drop the column `studentId` on the `BachelorThesisAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor1Id` on the `BachelorThesisAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor2Id` on the `BachelorThesisAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `thesisId` on the `BachelorThesisAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `BachelorThesisEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorConfirmed` on the `BachelorThesisEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `BachelorThesisEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `thesisId` on the `BachelorThesisEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `adminAllowed` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `adminConfirmed` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor1Confirmed` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor1Id` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor2Confirmed` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor2Id` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `thesisId` on the `BachelorThesisRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `OralDefenseAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor1Id` on the `OralDefenseAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor2Id` on the `OralDefenseAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `thesisId` on the `OralDefenseAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `adminAllowed` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor1Id` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor2Id` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `thesisId` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `processId` on the `Transition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentAttemptId]` on the table `BachelorThesisAssessment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentAttemptId]` on the table `BachelorThesisEvaluation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentAttemptId]` on the table `BachelorThesisRegistration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentAttemptId]` on the table `OralDefenseAssessment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentAttemptId]` on the table `OralDefenseRegistration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentAttemptId` to the `BachelorThesisAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAttemptId` to the `BachelorThesisEvaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAttemptId` to the `BachelorThesisRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAttemptId` to the `OralDefenseAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAttemptId` to the `OralDefenseRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisAssessment` DROP FOREIGN KEY `BachelorThesisAssessment_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisEvaluation` DROP FOREIGN KEY `BachelorThesisEvaluation_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisEvaluation` DROP FOREIGN KEY `BachelorThesisEvaluation_supervisorId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisEvaluation` DROP FOREIGN KEY `BachelorThesisEvaluation_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `BachelorThesisRegistration` DROP FOREIGN KEY `BachelorThesisRegistration_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseAssessment` DROP FOREIGN KEY `OralDefenseAssessment_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_supervisor1Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_supervisor2Id_fkey`;

-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_thesisId_fkey`;

-- DropForeignKey
ALTER TABLE `Thesis` DROP FOREIGN KEY `Thesis_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Transition` DROP FOREIGN KEY `Transition_processId_fkey`;

-- AlterTable
ALTER TABLE `BachelorThesisAssessment` DROP COLUMN `studentId`,
    DROP COLUMN `supervisor1Id`,
    DROP COLUMN `supervisor2Id`,
    DROP COLUMN `thesisId`,
    ADD COLUMN `studentAttemptId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `BachelorThesisEvaluation` DROP COLUMN `studentId`,
    DROP COLUMN `supervisorConfirmed`,
    DROP COLUMN `supervisorId`,
    DROP COLUMN `thesisId`,
    ADD COLUMN `studentAttemptId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` DROP COLUMN `adminAllowed`,
    DROP COLUMN `adminConfirmed`,
    DROP COLUMN `adminId`,
    DROP COLUMN `studentId`,
    DROP COLUMN `supervisor1Confirmed`,
    DROP COLUMN `supervisor1Id`,
    DROP COLUMN `supervisor2Confirmed`,
    DROP COLUMN `supervisor2Id`,
    DROP COLUMN `thesisId`,
    ADD COLUMN `studentAttemptId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` DROP COLUMN `studentId`,
    DROP COLUMN `supervisor1Id`,
    DROP COLUMN `supervisor2Id`,
    DROP COLUMN `thesisId`,
    ADD COLUMN `studentAttemptId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `adminAllowed`,
    DROP COLUMN `adminId`,
    DROP COLUMN `studentId`,
    DROP COLUMN `supervisor1Id`,
    DROP COLUMN `supervisor2Id`,
    DROP COLUMN `thesisId`,
    ADD COLUMN `studentAttemptId` VARCHAR(191) NOT NULL,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AlterTable
ALTER TABLE `Transition` DROP COLUMN `processId`;

-- CreateTable
CREATE TABLE `StudentAttempt` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `attemptNo` INTEGER NOT NULL,
    `thesisId` INTEGER NOT NULL,
    `supervisor2Id` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    INDEX `StudentAttempt_studentId_attemptNo_idx`(`studentId`, `attemptNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `BachelorThesisAssessment_studentAttemptId_key` ON `BachelorThesisAssessment`(`studentAttemptId`);

-- CreateIndex
CREATE UNIQUE INDEX `BachelorThesisEvaluation_studentAttemptId_key` ON `BachelorThesisEvaluation`(`studentAttemptId`);

-- CreateIndex
CREATE UNIQUE INDEX `BachelorThesisRegistration_studentAttemptId_key` ON `BachelorThesisRegistration`(`studentAttemptId`);

-- CreateIndex
CREATE UNIQUE INDEX `OralDefenseAssessment_studentAttemptId_key` ON `OralDefenseAssessment`(`studentAttemptId`);

-- CreateIndex
CREATE UNIQUE INDEX `OralDefenseRegistration_studentAttemptId_key` ON `OralDefenseRegistration`(`studentAttemptId`);

-- AddForeignKey
ALTER TABLE `StudentAttempt` ADD CONSTRAINT `StudentAttempt_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAttempt` ADD CONSTRAINT `StudentAttempt_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAttempt` ADD CONSTRAINT `StudentAttempt_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_studentAttemptId_fkey` FOREIGN KEY (`studentAttemptId`) REFERENCES `StudentAttempt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_studentAttemptId_fkey` FOREIGN KEY (`studentAttemptId`) REFERENCES `StudentAttempt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_studentAttemptId_fkey` FOREIGN KEY (`studentAttemptId`) REFERENCES `StudentAttempt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_studentAttemptId_fkey` FOREIGN KEY (`studentAttemptId`) REFERENCES `StudentAttempt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_studentAttemptId_fkey` FOREIGN KEY (`studentAttemptId`) REFERENCES `StudentAttempt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
