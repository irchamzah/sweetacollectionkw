import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const products = await db.products.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({ msg: "success", dataProducts: products });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export default handler;
