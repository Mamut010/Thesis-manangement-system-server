/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[requestId,name,value]` on the table `RequestData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[requestId,name,path]` on the table `RequestFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `RequestData` MODIFY `value` VARCHAR(65535) NOT NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RequestData_requestId_name_value_key` ON `RequestData`(`requestId`, `name`, `value`);

-- CreateIndex
CREATE UNIQUE INDEX `RequestFile_requestId_name_path_key` ON `RequestFile`(`requestId`, `name`, `path`);
