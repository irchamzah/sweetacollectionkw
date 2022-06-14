import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    const createData = await db.product_categories.create({
      data: {
        category_name: category_name,
        description: description,
      },
    });
    if (createData) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ msg: "error" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
export default handler;
