/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `creatorId` to the `Thesis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` ADD COLUMN `creatorId` VARCHAR(191) NOT NULL,
    MODIFY `submissionDeadline` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Lecturer`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
