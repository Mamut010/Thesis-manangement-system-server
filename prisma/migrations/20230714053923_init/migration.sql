-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `surname` VARCHAR(255) NULL,
    `forename` VARCHAR(255) NOT NULL,
    `display_name` VARCHAR(191) NULL,
    `signature` MEDIUMTEXT NULL,
    `refresh_token` VARCHAR(255) NULL,
    `socket_id` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `contact` VARCHAR(191) NULL,

    UNIQUE INDEX `Admins_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `number_of_theses` INTEGER NOT NULL DEFAULT 0,
    `theses_limit` INTEGER NULL DEFAULT 1,
    `bio` TEXT NULL,

    UNIQUE INDEX `Lecturers_user_id_key`(`user_id`),
    UNIQUE INDEX `Lecturers_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `matriculation_number` INTEGER NOT NULL,
    `intake` VARCHAR(191) NOT NULL,
    `ects` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Students_user_id_key`(`user_id`),
    UNIQUE INDEX `Students_matriculation_number_key`(`matriculation_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `field` VARCHAR(255) NULL,
    `type` INTEGER NULL,
    `slot` INTEGER NOT NULL DEFAULT 0,
    `slot_limit` INTEGER NULL DEFAULT 2,
    `activate_registration` BOOLEAN NOT NULL DEFAULT false,
    `activate_defense` BOOLEAN NOT NULL DEFAULT false,
    `submission_deadline` DATE NULL,
    `number_hard_copies` INTEGER NULL,
    `print_requirements` VARCHAR(255) NULL,
    `template_files` VARCHAR(255) NULL,
    `step` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bachelor_thesis_registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thesis_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `supervisor1_id` INTEGER NOT NULL,
    `supervisor2_id` INTEGER NOT NULL,
    `admin_id` INTEGER NULL,
    `date_of_birth` DATE NULL,
    `place_of_birth` VARCHAR(255) NULL,
    `student_date` DATE NULL,
    `further_participants` VARCHAR(255) NULL,
    `supervisor1_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `supervisor2_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `admin_confirmed` BOOLEAN NULL DEFAULT false,
    `issued` DATE NULL,
    `deadline_copy` DATE NULL,
    `extension_granted` DATE NULL,
    `chairman_of_examination` VARCHAR(255) NULL,
    `date_of_issue` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Bachelor_thesis_registrations_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oral_defense_registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `thesis_id` INTEGER NOT NULL,
    `supervisor1_id` INTEGER NOT NULL,
    `supervisor2_id` INTEGER NOT NULL,
    `spectators_present` INTEGER NULL DEFAULT 0,
    `weekdate` VARCHAR(255) NULL,
    `proposed_date` DATE NULL,
    `proposed_time` TIME(0) NULL,
    `room` VARCHAR(255) NULL,
    `concerned_agreed` INTEGER NULL DEFAULT 0,
    `receiving_date` DATE NULL,
    `submission_date` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Oral_defense_registrations_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bachelor_thesis_assessments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `thesis_id` INTEGER NOT NULL,
    `supervisor1_id` INTEGER NOT NULL,
    `supervisor2_id` INTEGER NOT NULL,
    `further_participants` VARCHAR(255) NULL,
    `supervisor1_grade` FLOAT NULL,
    `supervisor2_grade` FLOAT NULL,
    `assessment_thesis` VARCHAR(255) NULL,
    `assessment_date` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Bachelor_thesis_assessments_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oral_defense_assessments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `thesis_id` INTEGER NOT NULL,
    `supervisor1_id` INTEGER NOT NULL,
    `supervisor2_id` INTEGER NOT NULL,
    `date_defense` DATE NULL,
    `place_defense` VARCHAR(255) NULL,
    `start_date` DATE NULL,
    `finish_date` DATE NULL,
    `state_of_health` INTEGER NULL,
    `supervisor1_grade` FLOAT NULL,
    `supervisor2_grade` FLOAT NULL,
    `record` VARCHAR(255) NULL,
    `assessment_date` DATE NULL,
    `step` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Oral_defense_assessments_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_users_received_notifications` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_users_received_notifications_AB_unique`(`A`, `B`),
    INDEX `_users_received_notifications_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Theses` ADD CONSTRAINT `Theses_topic_id_fkey` FOREIGN KEY (`topic_id`) REFERENCES `Topics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_registrations` ADD CONSTRAINT `Bachelor_thesis_registrations_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_registrations` ADD CONSTRAINT `Bachelor_thesis_registrations_thesis_id_fkey` FOREIGN KEY (`thesis_id`) REFERENCES `Theses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_registrations` ADD CONSTRAINT `Bachelor_thesis_registrations_supervisor1_id_fkey` FOREIGN KEY (`supervisor1_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_registrations` ADD CONSTRAINT `Bachelor_thesis_registrations_supervisor2_id_fkey` FOREIGN KEY (`supervisor2_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_registrations` ADD CONSTRAINT `Bachelor_thesis_registrations_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_registrations` ADD CONSTRAINT `Oral_defense_registrations_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_registrations` ADD CONSTRAINT `Oral_defense_registrations_thesis_id_fkey` FOREIGN KEY (`thesis_id`) REFERENCES `Theses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_registrations` ADD CONSTRAINT `Oral_defense_registrations_supervisor1_id_fkey` FOREIGN KEY (`supervisor1_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_registrations` ADD CONSTRAINT `Oral_defense_registrations_supervisor2_id_fkey` FOREIGN KEY (`supervisor2_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_assessments` ADD CONSTRAINT `Bachelor_thesis_assessments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_assessments` ADD CONSTRAINT `Bachelor_thesis_assessments_thesis_id_fkey` FOREIGN KEY (`thesis_id`) REFERENCES `Theses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_assessments` ADD CONSTRAINT `Bachelor_thesis_assessments_supervisor1_id_fkey` FOREIGN KEY (`supervisor1_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bachelor_thesis_assessments` ADD CONSTRAINT `Bachelor_thesis_assessments_supervisor2_id_fkey` FOREIGN KEY (`supervisor2_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_assessments` ADD CONSTRAINT `Oral_defense_assessments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_assessments` ADD CONSTRAINT `Oral_defense_assessments_thesis_id_fkey` FOREIGN KEY (`thesis_id`) REFERENCES `Theses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_assessments` ADD CONSTRAINT `Oral_defense_assessments_supervisor1_id_fkey` FOREIGN KEY (`supervisor1_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oral_defense_assessments` ADD CONSTRAINT `Oral_defense_assessments_supervisor2_id_fkey` FOREIGN KEY (`supervisor2_id`) REFERENCES `Lecturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_users_received_notifications` ADD CONSTRAINT `_users_received_notifications_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notifications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_users_received_notifications` ADD CONSTRAINT `_users_received_notifications_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
