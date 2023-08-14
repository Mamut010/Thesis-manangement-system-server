-- AlterTable Re-add DEFAULT NULL
ALTER TABLE `BachelorThesisRegistration` ALTER COLUMN `supervisor1Confirmed` SET DEFAULT NULL,
    ALTER COLUMN `supervisor2Confirmed` SET DEFAULT NULL,
    ALTER COLUMN `adminConfirmed` SET DEFAULT NULL;
