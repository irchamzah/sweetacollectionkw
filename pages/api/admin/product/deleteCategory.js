import { db } from "../../../../prisma";

const handler = async (req, res) => {
  const { id } = req.body;
  //   const id = "62555352c8635e1d05900026";

  // count if product is using the category
  const count = await db.products.groupBy({
    by: ["product_category"],
    _count: {
      product_category: true,
    },
    where: {
      product_category: id,
    },
  });

  if (count.length > 0) {
    if (count[0]._count.product_category > 0) {
      res.status(200).json({ msg: "not-empty", count: count });
    } else {
      res.status(500).json({ msg: "error" });
    }
  } else {
    // If 0
    const del = await db.product_categories.delete({
      where: {
        id: id,
      },
    });

    if (del) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ msg: "error" });
    }
  }
};

export default handler;
