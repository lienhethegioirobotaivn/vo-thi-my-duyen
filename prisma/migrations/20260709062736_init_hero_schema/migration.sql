-- CreateTable
CREATE TABLE "HeroConfig" (
    "id" TEXT NOT NULL,
    "topSubtitle" TEXT NOT NULL,
    "mainTitleLine1" TEXT NOT NULL,
    "mainTitleLine2" TEXT NOT NULL,
    "engSubtitle" TEXT NOT NULL,
    "descVi" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "bgImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroButton" (
    "id" TEXT NOT NULL,
    "textVi" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "heroConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroButton_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HeroButton_heroConfigId_idx" ON "HeroButton"("heroConfigId");

-- AddForeignKey
ALTER TABLE "HeroButton" ADD CONSTRAINT "HeroButton_heroConfigId_fkey" FOREIGN KEY ("heroConfigId") REFERENCES "HeroConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
