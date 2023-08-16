/*
  Warnings:

  - You are about to drop the column `receivingDate` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `submissionDate` on the `OralDefenseRegistration` table. All the data in the column will be lost.
  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `OralDefenseRegistration` DROP COLUMN `receivingDate`,
    DROP COLUMN `submissionDate`,
    ADD COLUMN `admissionDate` DATETIME NULL,
    ADD COLUMN `dateReceived` DATETIME NULL,
    MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;
