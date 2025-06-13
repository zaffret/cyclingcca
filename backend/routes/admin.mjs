import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 12);
  let admin = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: password,
    role: req.body.role,
    imageURL: req.body.imageURL || "",
  };

  let collection = await db.collection("admin");
  let results = await collection.insertOne(admin);
  res.send(results).status(204);
});

export default router;
