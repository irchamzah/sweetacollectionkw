import { db } from "../../../../prisma";

const handler = async (req, res) => {
  const { rental } = req.body;
  // res.status(200).json({ msg: rental });

  try {
    const updateData = await db.rentals.update({
      data: {
        datetime: rental.datetime,
        total_price: rental.total_price,
        deadline: rental.deadline,
        note: rental.note,
        nama_pemesan: rental.nama_pemesan,
        nomer_telepon: rental.nomer_telepon,
        id_status: rental.id_status,
      },
      where: {
        id: rental.id,
      },
    });

    if (updateData) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ msg: "error" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
export default handler;
