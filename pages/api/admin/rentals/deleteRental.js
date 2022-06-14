import { db } from "../../../../prisma";
const fs = require("fs");
const handler = async (req, res) => {
  const { id } = req.body;
  //   const id = "62555352c8635e1d05900026";

  const getData = await db.rentals.findFirst({
    where: {
      id: id,
    },
  });
  fs.unlink("public/img/rentals/" + getData.image, (err) => {
    if (err) console.log("Delete file error");
  });
  const del = await db.rentals.delete({
    where: {
      id: id,
    },
  });
  if (del) {
    res.status(200).json({ msg: "success" });
  } else {
    res.status(500).json({ msg: "error" });
  }
};

export default handler;
