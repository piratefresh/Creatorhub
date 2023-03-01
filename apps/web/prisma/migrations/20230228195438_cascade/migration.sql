-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
