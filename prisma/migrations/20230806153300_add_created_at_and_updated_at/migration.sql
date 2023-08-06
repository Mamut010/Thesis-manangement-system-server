/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `receivingDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `updatedAt` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Field` ADD COLUMN `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedAt` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `Location` ADD COLUMN `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedAt` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `receivingDate` DATETIME NULL,
    MODIFY `submissionDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedAt` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- AlterTable
ALTER TABLE `Topic` ADD COLUMN `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updatedAt` TIMESTAMP(6) NOT NULL;
