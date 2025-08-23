/*
  Warnings:

  - You are about to drop the column `image` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Blog" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
