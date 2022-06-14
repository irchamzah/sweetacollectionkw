import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const { id, category_name, description } = req.body;

    const updateData = await db.product_categories.update({
      data: {
        category_name: category_name,
        description: description,
      },
      where: {
        id: id,
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
