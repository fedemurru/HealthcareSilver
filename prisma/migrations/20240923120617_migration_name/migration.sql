/*
  Warnings:

  - You are about to drop the column `email` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    ADD COLUMN `patientId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Patient` DROP COLUMN `createdAt`;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
