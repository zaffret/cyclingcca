import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { auth, checkRole } from "../auth/auth.mjs";
import {
  isNotEmail,
  isNotPsw,
  isNotNumber,
  isNotString,
  isNotPhoneNumber,
  isNotMatricNumber,
} from "../validation/validateInputs.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("members");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("members");
  let query = { _id: new ObjectId(req.params.id) };
  let results = await collection.findOne(query);

  if (!results) res.send("Member not found").status(404);
  else res.send(results).status(200);
});

router.post("/", auth, checkRole("admin"), async (req, res) => {
  let user = await db.collection("members").findOne({
    $or: [{ email: req.body.email }, { matric: req.body.matric }],
  });

  if (user) {
    res.status(400).send("User already exists");
    return;
  }

  let admin = await db.collection("admin").findOne({
    $or: [{ email: req.body.email }, { matric: req.body.matric }],
  });

  if (admin) {
    res.status(400).send("User already exists");
    return;
  }

  if (isNotEmail(req.body.email)) {
    return res.status(400).json({
      message: isNotEmail(req.body.email),
    });
  }

  if (isNotPsw(req.body.password)) {
    return res.status(400).json({
      message: isNotPsw(req.body.password),
    });
  }

  if (isNotPhoneNumber(req.body.phone)) {
    return res.status(400).json({
      message: isNotPhoneNumber(req.body.phone),
    });
  }

  if (isNotMatricNumber(req.body.matric)) {
    return res.status(400).json({
      message: isNotMatricNumber(req.body.matric),
    });
  }

  const password = await bcrypt.hash(req.body.password, 12);
  let newMember = {
    name: req.body.name,
    matric: req.body.matric,
    email: req.body.email,
    phone: req.body.phone,
    password: password,
    year: req.body.year,
    role: req.body.role,
    distance: 0,
    sealpoints: 0,
    attendance: 0,
    events: [],
    achievements: "",
    imageURL: req.body.imageURL || "",
  };

  let collection = await db.collection("members");
  await collection.insertOne(newMember);
  res.send(newMember).status(204);
});

router.patch("/:id", auth, checkRole("admin"), async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let collection = await db.collection("members");
  let record = await collection.findOne(query);

  let user = await db.collection("members").findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  if (user) {
    res.status(400).send("User already exists");
    return;
  }

  let admin = await db.collection("admin").findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  if (admin) {
    res.status(400).send("User already exists");
    return;
  }

  if (!record) res.send("Member not found").status(404);

  if (isNotEmail(req.body.email)) {
    return res.status(400).json({
      message: isNotEmail(req.body.email),
    });
  }

  if (isNotPhoneNumber(req.body.phone)) {
    return res.status(400).json({
      message: isNotPhoneNumber(req.body.phone),
    });
  }

  if (isNotNumber(req.body.sealpoints, "sealpoints")) {
    return res.status(400).json({
      message: isNotNumber(req.body.sealpoints, "sealpoints"),
    });
  }

  if (isNotString("achievements", req.body.achievements)) {
    return res.status(400).json({
      message: isNotString("achievements", req.body.achievements),
    });
  }

  const updates = {
    $set: {
      name: req.body.name || record.name,
      email: req.body.email || record.email,
      mobile: req.body.mobile || record.mobile,
      year: req.body.year || record.year,
      sealpoints: req.body.sealpoints || record.sealpoints,
      achievements: req.body.achievements || record.achievements,
      imageURL: req.body.imageURL || record.imageURL,
    },
  };

  await collection.updateOne(query, updates);
  let updatedMember = await collection
    .find({ _id: new ObjectId(req.params.id) })
    .toArray();
  res.send(updatedMember).status(200);
});

router.delete("/:id", auth, checkRole("admin"), async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let collection = await db.collection("members");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;
