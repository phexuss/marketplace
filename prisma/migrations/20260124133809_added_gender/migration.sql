-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNISEX');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT NOT NULL DEFAULT 'ZARA',
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'UNISEX';
