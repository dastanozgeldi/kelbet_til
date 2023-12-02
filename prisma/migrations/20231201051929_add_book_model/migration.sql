-- CreateEnum
CREATE TYPE "Language" AS ENUM ('T1', 'T2');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "term" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
