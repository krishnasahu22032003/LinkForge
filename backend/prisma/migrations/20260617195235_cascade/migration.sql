-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_shortUrlId_fkey";

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
