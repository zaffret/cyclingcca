import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await db.collection("members").findOne({ email });
    let userCollection = "members";

    if (!user) {
      user = await db.collection("admin").findOne({ email });
      userCollection = "admin";
    }

    if (!user) {
      res.status(401).send("Invalid email");
      return;
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      let token = jwt.sign(
        { role: user.role, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        }
      );

      const loginTimestamp = new Date();

      await db
        .collection(userCollection)
        .updateOne(
          { email: user.email },
          { $set: { lastLogin: loginTimestamp } }
        );

      const { password, ...rest } = user;

      let result = {
        user: rest,
        token: token,
        expiresIn: 168,
      };

      return res.status(200).json({
        ...result,
        message: "Logged in successfully",
      });
    } else {
      res.status(401).send("Make sure your credentials are correct");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
