import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    let countDipinjam = await db.rentals.findMany({
      where: {
        id_status: 1,
      },
    });
    let dipinjam = countDipinjam.length;
    let countSelesai = await db.rentals.findMany({
      where: {
        id_status: 2,
      },
    });
    let selesai = countSelesai.length;
    let countTelat = await db.rentals.findMany({
      where: {
        id_status: 3,
      },
    });
    let telat = countTelat.length;
    let countHilang = await db.rentals.findMany({
      where: {
        id_status: 4,
      },
    });
    let hilang = countHilang.length;

    //getAllHistories
    const rental_statuses = await db.rental_statuses.findMany({});
    let rentals = await db.rentals.findMany({
      where: {
        id_status: 1,
      },
    });
    for (let i = 0; i < rental_statuses.length; i++) {
      for (let j = 0; j < rentals.length; j++) {
        rentals[j].warna = "";
        if (rentals[j].id_status == 1) {
          rentals[j].warna = "text-blue-500";
        } else if (rentals[j].id_status == 2) {
          rentals[j].warna = "text-green-500";
        } else if (rentals[j].id_status == 3) {
          rentals[j].warna = "text-gray-500";
        } else if (rentals[j].id_status == 4) {
          rentals[j].warna = "text-red-500";
        }
        if (rental_statuses[i].id_status == rentals[j].id_status) {
          rentals[j].status = rental_statuses[i].status;
        }
      }
    }

    //getAllHistories2
    const rental_statuses2 = await db.rental_statuses.findMany({});
    let rentals2 = await db.rentals.findMany({
      where: {
        id_status: { in: [3, 4] },
      },
    });
    for (let i = 0; i < rental_statuses2.length; i++) {
      for (let j = 0; j < rentals2.length; j++) {
        rentals2[j].warna = "";
        if (rentals2[j].id_status == 1) {
          rentals2[j].warna = "text-blue-500";
        } else if (rentals2[j].id_status == 2) {
          rentals2[j].warna = "text-green-500";
        } else if (rentals2[j].id_status == 3) {
          rentals2[j].warna = "text-gray-500";
        } else if (rentals2[j].id_status == 4) {
          rentals2[j].warna = "text-red-500";
        }
        if (rental_statuses2[i].id_status == rentals2[j].id_status) {
          rentals2[j].status = rental_statuses2[i].status;
        }
      }
    }

    res.status(200).json({
      dipinjam,
      selesai,
      telat,
      hilang,
      dataRentals: rentals,
      dataRentals2: rentals2,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export default handler;
