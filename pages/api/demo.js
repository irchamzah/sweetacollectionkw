import nextConnect from "next-connect";
import multer from "multer";
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
// const apiRoute = nextConnect({
//   // Handle any other http method
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   },
//   onError(req, res) {
//     res.status(500).json({ error: "Something wrong hehe" });
//   },
// });

// // POST req
// apiRoute.post((req, res) => {
//   // const { image } = req.files;
//   console.log("file" + req.file);
//   console.log("body" + req.body);
//   // console.log(req.file);
//   res.status(200).json({ data: req.file, a: "a" });
// });
// // Multer;
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       return cb(null, "public/img/products/");
//     },
//     filename: (req, file, cb) => {
//       return cb(null, file.originalname);
//     },
//   }),
// });
// apiRoute.use(upload.single("image"));

// export default apiRoute;
const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
  onError(req, res) {
    res.status(500).json({ error: "Something wrong hehe" });
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
});
apiRoute.use(upload.single("image"));
apiRoute.post((req, res) => {
  console.log(req.file.filename);
  res.status(200).json({ a: "a" });
});

export default apiRoute;
