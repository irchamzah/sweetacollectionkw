import { db } from "../../../prisma";
import md5 from "md5";
const handler = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const { credentials } = req.body;
    const credentials = {
      email: "07akhmadnur@gmail.com",
      password: "12345",
    };
    const login = await db.accounts.count({
      where: {
        email: credentials.email,
        password: md5(credentials.password),
      },
    });
    if (login > 0) {
      const data = await db.accounts.findFirst({
        where: {
          email: credentials.email,
          password: md5(credentials.password),
        },
      });

      res.status(200).json({ msg: "success", data: data });
    } else {
      res.status(500).json({ msg: "error" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export default handler;
