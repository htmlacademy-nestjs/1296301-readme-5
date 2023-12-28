/*
  Warnings:

  - The `status` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'draft');

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "user_id" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'draft',
ALTER COLUMN "original_user_id" DROP NOT NULL,
ALTER COLUMN "original_post_id" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "announcement" DROP NOT NULL,
ALTER COLUMN "quote_author" DROP NOT NULL;
