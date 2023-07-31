/*
  Warnings:

  - You are about to drop the column `theses_limit` on the `Lecturers` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Oral_defense_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `Theses` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Theses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bachelor_thesis_registrations` MODIFY `supervisor2_id` INTEGER NULL,
    MODIFY `further_participants` TEXT NULL,
    MODIFY `supervisor2_confirmed` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Lecturers` DROP COLUMN `theses_limit`;

-- AlterTable
ALTER TABLE `Oral_defense_assessments` MODIFY `record` TEXT NULL;

-- AlterTable
ALTER TABLE `Oral_defense_registrations` DROP COLUMN `room`,
    ADD COLUMN `actual_date` DATE NULL,
    ADD COLUMN `actual_time` TIME(0) NULL,
    ADD COLUMN `location_id` INTEGER NULL,
    MODIFY `supervisor2_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Theses` DROP COLUMN `field`,
    DROP COLUMN `type`,
    ADD COLUMN `field_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Theses` ADD CONSTRAINT `Theses_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_registrations` ADD CONSTRAINT `Oral_defense_registrations_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
