/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `TransitionId` on the `RequestAction` table. All the data in the column will be lost.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `transitionId` to the `RequestAction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RequestAction` DROP FOREIGN KEY `RequestAction_TransitionId_fkey`;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `RequestAction` DROP COLUMN `TransitionId`,
    ADD COLUMN `transitionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `RequestAction` ADD CONSTRAINT `RequestAction_transitionId_fkey` FOREIGN KEY (`transitionId`) REFERENCES `Transition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
