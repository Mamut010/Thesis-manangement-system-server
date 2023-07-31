/*
  Warnings:

  - You are about to drop the `Admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bachelor_thesis_assessments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bachelor_thesis_registrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lecturers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oral_defense_assessments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oral_defense_registrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_users_received_notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bachelor_thesis_assessments` DROP FOREIGN KEY `Bachelor_thesis_assessments_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_assessments` DROP FOREIGN KEY `Bachelor_thesis_assessments_supervisor1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_assessments` DROP FOREIGN KEY `Bachelor_thesis_assessments_supervisor2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_assessments` DROP FOREIGN KEY `Bachelor_thesis_assessments_thesis_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_registrations` DROP FOREIGN KEY `Bachelor_thesis_registrations_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_registrations` DROP FOREIGN KEY `Bachelor_thesis_registrations_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_registrations` DROP FOREIGN KEY `Bachelor_thesis_registrations_supervisor1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_registrations` DROP FOREIGN KEY `Bachelor_thesis_registrations_supervisor2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bachelor_thesis_registrations` DROP FOREIGN KEY `Bachelor_thesis_registrations_thesis_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_assessments` DROP FOREIGN KEY `Oral_defense_assessments_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_assessments` DROP FOREIGN KEY `Oral_defense_assessments_supervisor1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_assessments` DROP FOREIGN KEY `Oral_defense_assessments_supervisor2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_assessments` DROP FOREIGN KEY `Oral_defense_assessments_thesis_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_registrations` DROP FOREIGN KEY `Oral_defense_registrations_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_registrations` DROP FOREIGN KEY `Oral_defense_registrations_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_registrations` DROP FOREIGN KEY `Oral_defense_registrations_supervisor1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_registrations` DROP FOREIGN KEY `Oral_defense_registrations_supervisor2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Oral_defense_registrations` DROP FOREIGN KEY `Oral_defense_registrations_thesis_id_fkey`;

-- DropForeignKey
ALTER TABLE `Theses` DROP FOREIGN KEY `Theses_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `Theses` DROP FOREIGN KEY `Theses_topic_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `_users_received_notifications` DROP FOREIGN KEY `_users_received_notifications_A_fkey`;

-- DropForeignKey
ALTER TABLE `_users_received_notifications` DROP FOREIGN KEY `_users_received_notifications_B_fkey`;

-- DropTable
DROP TABLE `Admins`;

-- DropTable
DROP TABLE `Bachelor_thesis_assessments`;

-- DropTable
DROP TABLE `Bachelor_thesis_registrations`;

-- DropTable
DROP TABLE `Fields`;

-- DropTable
DROP TABLE `Lecturers`;

-- DropTable
DROP TABLE `Notifications`;

-- DropTable
DROP TABLE `Oral_defense_assessments`;

-- DropTable
DROP TABLE `Oral_defense_registrations`;

-- DropTable
DROP TABLE `Roles`;

-- DropTable
DROP TABLE `Students`;

-- DropTable
DROP TABLE `Theses`;

-- DropTable
DROP TABLE `Topics`;

-- DropTable
DROP TABLE `Users`;

-- DropTable
DROP TABLE `_users_received_notifications`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `surname` VARCHAR(255) NULL,
    `forename` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(191) NULL,
    `signature` MEDIUMTEXT NULL,
    `refreshToken` VARCHAR(255) NULL,
    `socketId` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `contact` VARCHAR(191) NULL,

    UNIQUE INDEX `Admin_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `numberOfTheses` INTEGER NOT NULL DEFAULT 0,
    `bio` TEXT NULL,

    UNIQUE INDEX `Lecturer_userId_key`(`userId`),
    UNIQUE INDEX `Lecturer_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `matriculationNumber` INTEGER NOT NULL,
    `intake` VARCHAR(191) NOT NULL,
    `ects` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Student_userId_key`(`userId`),
    UNIQUE INDEX `Student_matriculationNumber_key`(`matriculationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Thesis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topicId` INTEGER NULL,
    `fieldId` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `slot` INTEGER NOT NULL DEFAULT 0,
    `slotLimit` INTEGER NULL DEFAULT 2,
    `activateRegistration` BOOLEAN NOT NULL DEFAULT false,
    `activateDefense` BOOLEAN NOT NULL DEFAULT false,
    `submissionDeadline` DATE NULL,
    `numberHardCopies` INTEGER NULL,
    `printRequirements` VARCHAR(255) NULL,
    `templateFiles` VARCHAR(255) NULL,
    `step` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BachelorThesisRegistration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thesisId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `supervisor1Id` INTEGER NOT NULL,
    `supervisor2Id` INTEGER NULL,
    `adminId` INTEGER NULL,
    `dateOfBirth` DATE NULL,
    `placeOfBirth` VARCHAR(255) NULL,
    `studentDate` DATE NULL,
    `furtherParticipants` TEXT NULL,
    `supervisor1Confirmed` BOOLEAN NOT NULL DEFAULT false,
    `supervisor2Confirmed` BOOLEAN NULL DEFAULT false,
    `adminConfirmed` BOOLEAN NULL DEFAULT false,
    `issued` DATE NULL,
    `deadlineCopy` DATE NULL,
    `extensionGranted` DATE NULL,
    `chairmanOfExamination` VARCHAR(255) NULL,
    `dateOfIssue` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `BachelorThesisRegistration_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OralDefenseRegistration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `thesisId` INTEGER NOT NULL,
    `supervisor1Id` INTEGER NOT NULL,
    `supervisor2Id` INTEGER NULL,
    `locationId` INTEGER NULL,
    `spectatorsPresent` INTEGER NULL DEFAULT 0,
    `weekdate` VARCHAR(255) NULL,
    `proposedDate` DATE NULL,
    `proposedTime` TIME(0) NULL,
    `actualDate` DATE NULL,
    `actualTime` TIME(0) NULL,
    `concernedAgreed` INTEGER NULL DEFAULT 0,
    `receivingDate` DATE NULL,
    `submissionDate` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `OralDefenseRegistration_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BachelorThesisAssessment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `thesisId` INTEGER NOT NULL,
    `supervisor1Id` INTEGER NOT NULL,
    `supervisor2Id` INTEGER NOT NULL,
    `furtherParticipants` VARCHAR(255) NULL,
    `supervisor1Grade` FLOAT NULL,
    `supervisor2Grade` FLOAT NULL,
    `assessmentThesis` VARCHAR(255) NULL,
    `assessmentDate` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `BachelorThesisAssessment_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OralDefenseAssessment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `thesisId` INTEGER NOT NULL,
    `supervisor1Id` INTEGER NOT NULL,
    `supervisor2Id` INTEGER NOT NULL,
    `dateDefense` DATE NULL,
    `placeDefense` VARCHAR(255) NULL,
    `startDate` DATE NULL,
    `finishDate` DATE NULL,
    `stateOfHealth` INTEGER NULL,
    `supervisor1Grade` FLOAT NULL,
    `supervisor2Grade` FLOAT NULL,
    `record` TEXT NULL,
    `assessmentDate` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `OralDefenseAssessment_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_usersReceivedNotifications` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_usersReceivedNotifications_AB_unique`(`A`, `B`),
    INDEX `_usersReceivedNotifications_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thesis` ADD CONSTRAINT `Thesis_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisRegistration` ADD CONSTRAINT `BachelorThesisRegistration_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseRegistration` ADD CONSTRAINT `OralDefenseRegistration_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BachelorThesisAssessment` ADD CONSTRAINT `BachelorThesisAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_thesisId_fkey` FOREIGN KEY (`thesisId`) REFERENCES `Thesis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor1Id_fkey` FOREIGN KEY (`supervisor1Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OralDefenseAssessment` ADD CONSTRAINT `OralDefenseAssessment_supervisor2Id_fkey` FOREIGN KEY (`supervisor2Id`) REFERENCES `Lecturer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usersReceivedNotifications` ADD CONSTRAINT `_usersReceivedNotifications_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usersReceivedNotifications` ADD CONSTRAINT `_usersReceivedNotifications_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
