/*
  Warnings:

  - You are about to drop the `_LisenceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LisenceToUser" DROP CONSTRAINT "_LisenceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LisenceToUser" DROP CONSTRAINT "_LisenceToUser_B_fkey";

-- AlterTable
ALTER TABLE "Lisence" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_LisenceToUser";

-- AddForeignKey
ALTER TABLE "Lisence" ADD CONSTRAINT "Lisence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
