/*
  Warnings:

  - You are about to drop the column `weekday` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `signature` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `contact` VARCHAR(255) NULL,
    MODIFY `title` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `BachelorThesisEvaluation` MODIFY `title` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Field` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Lecturer` ADD COLUMN `signature` VARCHAR(255) NULL,
    MODIFY `bio` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `Location` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `weekday`,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `room` TEXT NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `signature` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AlterTable
ALTER TABLE `Topic` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `signature`;
