-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Concert" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "concertDate" TIMESTAMP(3) NOT NULL,
    "ticketPrice" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Concert_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ID" TEXT NOT NULL,
    "concertID" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "orderID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Order" (
    "ID" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_concertID_fkey" FOREIGN KEY ("concertID") REFERENCES "Concert"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
