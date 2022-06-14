import { db } from "../../../../prisma";
import multer from "multer";
import nextConnect from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = nextConnect({
  onNoMatch: (req, res) => {
    res.status(405).json({ msg: "Method not allowed" });
  },
  onError: (req, res) => {
    res.status(500).json({ msg: "Something wrong" });
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
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

apiRoute.use(upload.single("image"));
apiRoute.post(async (req, res) => {
  try {
    const {
      product_name,
      product_category,
      description,
      color,
      size,
      price,
      total_stock,
    } = req.body;

    const create = await db.products.create({
      data: {
        product_name: product_name,
        product_category: product_category,
        description: description,
        color: color,
        size: size,
        price: parseInt(price),
        total_stock: parseInt(total_stock),
        image: req.file.filename.toString(),
        available_stock: 0,
      },
    });
    // const create = true;
    if (create) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ msg: "err" });
    }
  } catch (err) {
    res.status(500).json({ msg: "err" });
  }
});

export default apiRoute;
