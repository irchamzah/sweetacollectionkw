import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const categories = await db.product_categories.findMany({});
    // const product_count = await db.products.groupBy({
    //   by: ["product_category"],
    //   _count: {
    //     product_category: true,
    //   },
    // });
    const products = await db.products.findMany({
      select: {
        product_category: true,
      },
    });
    let count;
    for (let i = 0; i < categories.length; i++) {
      count = 0;
      for (let j = 0; j < products.length; j++) {
        if (categories[i].id == products[j].product_category) {
          count++;
        }
      }
      categories[i].count = count;
    }

    res.status(200).json({ categories: categories });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
export default handler;
