/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `exp` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to alter the column `submissionDeadline` on the `StudentAttempt` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `RefreshToken` DROP COLUMN `exp`;

-- AlterTable
ALTER TABLE `StudentAttempt` MODIFY `submissionDeadline` DATETIME NULL;
