/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[studentId,attemptNo]` on the table `StudentAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `StudentAttempt` DROP FOREIGN KEY `StudentAttempt_studentId_fkey`;

-- DropIndex
DROP INDEX `StudentAttempt_studentId_attemptNo_idx` ON `StudentAttempt`;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StudentAttempt_studentId_attemptNo_key` ON `StudentAttempt`(`studentId`, `attemptNo`);

-- ReAddForeignKey
ALTER TABLE `StudentAttempt` ADD CONSTRAINT `StudentAttempt_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
