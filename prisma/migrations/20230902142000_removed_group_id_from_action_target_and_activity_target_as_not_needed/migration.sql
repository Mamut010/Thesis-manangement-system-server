/*
  Warnings:

  - You are about to drop the column `groupId` on the `ActionTarget` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `ActivityTarget` table. All the data in the column will be lost.
  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[name]` on the table `Target` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `ActionTarget` DROP FOREIGN KEY `ActionTarget_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `ActivityTarget` DROP FOREIGN KEY `ActivityTarget_groupId_fkey`;

-- AlterTable
ALTER TABLE `ActionTarget` DROP COLUMN `groupId`;

-- AlterTable
ALTER TABLE `ActivityTarget` DROP COLUMN `groupId`;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Target_name_key` ON `Target`(`name`);
