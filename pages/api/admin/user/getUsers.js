import { db } from "../../../../prisma";
import md5 from "md5";
const handler = async (req, res) => {
  const { method } = req.body;
  // const { id } = req.body.id;
  try {
    const data = await db.accounts.findFirst({
      // where: {
      //   id: "62555352c8635e1d05900025",
      // },
    });
    res.status(200).json({ accounts: data });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export default handler;
