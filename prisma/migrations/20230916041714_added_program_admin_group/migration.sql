/*
  Warnings:

  - You are about to alter the column `proposedDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `actualDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `admissionDate` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateReceived` on the `OralDefenseRegistration` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submissionDeadline` on the `Thesis` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `OralDefenseRegistration` MODIFY `proposedDate` DATETIME NULL,
    MODIFY `actualDate` DATETIME NULL,
    MODIFY `admissionDate` DATETIME NULL,
    MODIFY `dateReceived` DATETIME NULL;

-- AlterTable
ALTER TABLE `Thesis` MODIFY `submissionDeadline` DATETIME NULL;

-- CreateTable
CREATE TABLE `ProgramAdminGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` VARCHAR(191) NOT NULL,
    `programId` INTEGER NOT NULL,

    UNIQUE INDEX `ProgramAdminGroup_groupId_key`(`groupId`),
    UNIQUE INDEX `ProgramAdminGroup_programId_key`(`programId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProgramAdminGroup` ADD CONSTRAINT `ProgramAdminGroup_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProgramAdminGroup` ADD CONSTRAINT `ProgramAdminGroup_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
