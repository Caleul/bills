-- CreateTable
CREATE TABLE "PerformedCalculation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barCode" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "originalAmount" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "interest" DECIMAL(65,30) NOT NULL,
    "fine" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "PerformedCalculation_pkey" PRIMARY KEY ("id")
);
