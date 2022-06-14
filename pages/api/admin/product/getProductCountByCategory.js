import { db } from "../../../../prisma";
const handler = async (req, res) => {
  try {
    const { category_id } = req.body;
    // const category_id = "62555352c8635e1d05900026";
    const count = await db.products.count({
      where: {
        product_category: category_id,
      },
    });
    res.status(200).json({ data: count });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
export default handler;
