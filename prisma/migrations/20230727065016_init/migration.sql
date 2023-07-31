/*
  Warnings:

  - You are about to drop the column `assessmentThesis` on the `BachelorThesisAssessment` table. All the data in the column will be lost.
  - You are about to alter the column `stateOfHealth` on the `OralDefenseAssessment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to drop the column `actualTime` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `proposedTime` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the `Locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OralDefenseRegistration` DROP FOREIGN KEY `OralDefenseRegistration_locationId_fkey`;

-- DropIndex
DROP INDEX `Lecturer_title_key` ON `Lecturer`;

-- AlterTable
ALTER TABLE `BachelorThesisAssessment` DROP COLUMN `assessmentThesis`,
    ADD COLUMN `assessmentDescription` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `BachelorThesisRegistration` MODIFY `supervisor1Id` INTEGER NULL,
    MODIFY `supervisor1Confirmed` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `OralDefenseAssessment` MODIFY `stateOfHealth` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `actualTime`,
    DROP COLUMN `locationId`,
    DROP COLUMN `proposedTime`,
    ADD COLUMN `room` VARCHAR(191) NULL,
    MODIFY `supervisor1Id` INTEGER NULL,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `receivingDate` DATETIME NULL,
    MODIFY `submissionDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `submissionDeadline` DATETIME NULL;

-- DropTable
DROP TABLE `Locations`;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
