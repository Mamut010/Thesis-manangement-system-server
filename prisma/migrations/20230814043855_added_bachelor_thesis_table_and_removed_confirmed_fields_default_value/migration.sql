/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `receivingDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `BachelorThesisRegistration` ALTER COLUMN `supervisor1Confirmed` DROP DEFAULT,
    ALTER COLUMN `supervisor2Confirmed` DROP DEFAULT,
    ALTER COLUMN `adminConfirmed` DROP DEFAULT;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `receivingDate` DATETIME NULL,
    MODIFY `submissionDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- CreateTable
CREATE TABLE `BachelorThesisEvaluation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thesisId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `supervisorId` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `date` DATE NULL,
    `supervisorConfirmed` BOOLEAN NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `BachelorThesisEvaluation_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisEvaluation` ADD CONSTRAINT `BachelorThesisEvaluation_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `Lecturer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
