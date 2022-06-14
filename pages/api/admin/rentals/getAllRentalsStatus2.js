import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const rental_statuses = await db.rental_statuses.findMany();

    res.status(200).json({ msg: "success", dataStatus: rental_statuses });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
export default handler;
