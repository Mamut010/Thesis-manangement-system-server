/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `activateDefense` on the `Thesis` table. All the data in the column will be lost.
  - You are about to drop the column `activateRegistration` on the `Thesis` table. All the data in the column will be lost.
  - You are about to drop the column `numberHardCopies` on the `Thesis` table. All the data in the column will be lost.
  - You are about to drop the column `printRequirements` on the `Thesis` table. All the data in the column will be lost.
  - You are about to drop the column `submissionDeadline` on the `Thesis` table. All the data in the column will be lost.
  - You are about to drop the column `templateFiles` on the `Thesis` table. All the data in the column will be lost.
  - Made the column `title` on table `Thesis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `StudentAttempt` ADD COLUMN `numberHardCopies` INTEGER NULL,
    ADD COLUMN `printRequirements` VARCHAR(255) NULL,
    ADD COLUMN `submissionDeadline` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` DROP COLUMN `activateDefense`,
    DROP COLUMN `activateRegistration`,
    DROP COLUMN `numberHardCopies`,
    DROP COLUMN `printRequirements`,
    DROP COLUMN `submissionDeadline`,
    DROP COLUMN `templateFiles`,
    MODIFY `title` VARCHAR(255) NOT NULL;
