import { db } from "../../../../prisma";

const handler = async (req, res) => {
  try {
    const { id_rental, id_products, amount, note } = req.body;
    const getProductById = await db.products.findFirst({
      where: {
        id: id_products,
      },
    });

    // let count;
    // for (let i = 0; i < getProductById.length; i++) {
    //   count = 0;
    //   if (getProductById[i].id == )
    // }

    const createDataRentalDetail = await db.rental_details.create({
      data: {
        id_rental: id_rental,
        product_name: getProductById.product_name,
        color: getProductById.color,
        size: getProductById.size,
        price: parseInt(getProductById.price),
        amount: parseInt(amount),
        image: getProductById.image,
        note: note,
      },
    });
    if (createDataRentalDetail) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ msg: "error" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
export default handler;
