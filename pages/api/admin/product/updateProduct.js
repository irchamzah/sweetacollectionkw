import { db } from "../../../../prisma";
import multer from "multer";
import nextConnect from "next-connect";
const fs = require("fs");
export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = nextConnect({
  onError: (req, res) => {
    res.status(405).json({ msg: "Request is not allowed" });
  },
  onNoMatch: (req, res) => {
    res.status(500).json({ msg: "Something wrong..." });
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

apiRoute.use(upload.single("image"));
apiRoute.post(async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const {
    id,
    product_name,
    product_category,
    description,
    color,
    size,
    price,
    total_stock,
  } = req.body;

  if (req.file !== undefined) {
    try {
      // Delete old img
      const getData = await db.products.findFirst({
        where: {
          id: id,
        },
      });
      // fs.unlink("public/img/products/" + getData.image, (err) => {
      //   if (err) {
      //     console.log("Failed to delete image");
      //   }
      // });

      const update = await db.products.update({
        where: {
          id: id,
        },
        data: {
          product_name: product_name,
          product_category: product_category,
          description: description,
          color: color,
          size: size,
          price: parseInt(price),
          total_stock: parseInt(total_stock),
          image: req.file.filename.toString(),
        },
      });
      if (update) {
        res.status(200).json({ msg: "success" });
      } else {
        res.status(500).json({ msg: "err" });
      }
    } catch (err) {
      res.status(500).json({ msg: "err" });
    }
  } else {
    const update = await db.products.update({
      where: {
        id: id,
      },
      data: {
        product_name: product_name,
        product_category: product_category,
        description: description,
        color: color,
        size: size,
        price: parseInt(price),
        total_stock: parseInt(total_stock),
        // image: req.file.filename.toString(),
      },
    });
    if (update) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ msg: "err" });
    }
  }
});

export default apiRoute;
