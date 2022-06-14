import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const { id } = req.body;
    const rental_details = await db.rental_details.findMany({
      where: {
        id_rental: id,
      },
    });

    let HitungTotalHarga = 0;
    for (let i = 0; i < rental_details.length; i++) {
      HitungTotalHarga =
        HitungTotalHarga + rental_details[i].price * rental_details[i].amount;
    }

    //update total price
    const updateTotalHarga = await db.rentals.update({
      data: {
        total_price: HitungTotalHarga,
      },
      where: {
        id: id,
      },
    });

    res.status(200).json({
      msg: "success",
      dataRentalDetails: rental_details,
      HitungTotalHarga: HitungTotalHarga,
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export default handler;
