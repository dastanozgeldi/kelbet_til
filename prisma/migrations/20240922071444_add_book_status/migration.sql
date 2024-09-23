-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'ACTIVE';
