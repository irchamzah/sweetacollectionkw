const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const seed = async () => {
  try {
    // account
    const account = await db.accounts.create({
      data: {
        email: "07akhmadnur@gmail.com",
        first_name: "Akhmad Nur",
        last_name: "Hidayat",
        password: "827ccb0eea8a706c4c34a16891f84e7b",
      },
    });

    // product categories
    const category = await db.product_categories.create({
      data: {
        category_name: "Jawa Timur",
        description: "test",
      },
    });

    // product
    const product = await db.products.create({
      data: {
        product_name: "Baju Satu",
        description: "test",
        price: 50000,
        color: "Merah",
        size: "M",
        image: "../public/image/a.jpg",
        product_category: category.id,
        total_stock: 10,
        available_stock: 8,
      },
    });

    // rental statuses
    const rental_status = await db.rental_statuses.createMany({
      data: [
        { id_status: 1, status: "Dipinjam" },
        { id_status: 2, status: "Dikembalikan" },
        { id_status: 3, status: "Telat" },
        { id_status: 4, status: "Hilang" },
      ],
    });

    // rental
    const rental = await db.rentals.create({
      data: {
        total_price: 100000,
        deadline: "12/04/2022",
        note: "test",
        id_status: 1,
      },
    });

    // rental detail
    const rental_detail = await db.rental_details.create({
      data: {
        id_rental: rental.id,
        product_name: product.product_name,
        color: product.color,
        size: product.size,
        price: product.price,
        amount: 2,
        image: product.image,
        note: "test",
      },
    });

    // Log
    const log = await db.logs.create({
      data: {
        account_id: account.id,
        action: "Add",
        object: rental.id,
      },
    });
    console.log("Success");
  } catch (err) {
    console.log(err);
  } finally {
    db.$disconnect;
  }
};

seed();
