/*
  Warnings:

  - You are about to drop the column `owner_id` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_owner_id_fkey";

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "owner_id";

-- DropTable
DROP TABLE "users";

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
