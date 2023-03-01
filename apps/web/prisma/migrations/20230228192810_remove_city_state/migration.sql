/*
  Warnings:

  - You are about to drop the column `city` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "city",
DROP COLUMN "state";
