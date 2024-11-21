-- CreateTable
CREATE TABLE "farmer" (
    "id" SERIAL NOT NULL,
    "fname" INTEGER NOT NULL,
    "lname" INTEGER NOT NULL,
    "password" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "pincode" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,

    CONSTRAINT "farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crops" (
    "id" SERIAL NOT NULL,
    "crop" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "fid" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fname" INTEGER NOT NULL,
    "lname" INTEGER NOT NULL,
    "password" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "pincode" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crops_id_key" ON "Crops"("id");

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_fid_fkey" FOREIGN KEY ("fid") REFERENCES "farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
