/*
  Warnings:

  - You are about to drop the column `type` on the `Project` table. All the data in the column will be lost.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationType` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "type",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "locationType" "LocationType" NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;
