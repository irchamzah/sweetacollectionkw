import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const { id } = req.body;
    //   const id = "626fb4dd1c31855db865eb0f";
    let data = await db.products.findFirst({
      where: {
        id: id,
      },
    });
    const category = await db.product_categories.findFirst({
      where: {
        id: data.product_category,
      },
    });

    data.product_category = category;
    res.status(200).json({ msg: "success", data: data });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
};

export default handler;
