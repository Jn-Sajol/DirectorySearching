-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "skills" TEXT[],
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "facebookProfile" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE INDEX "Member_profession_idx" ON "Member"("profession");

-- CreateIndex
CREATE INDEX "Member_skills_idx" ON "Member"("skills");
