/*
  Warnings:

  - You are about to drop the column `suggestiveSkills` on the `Position` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "suggestiveSkills";

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "positionId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_id_key" ON "Skill"("id");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
