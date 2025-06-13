import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Missing Token" });
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Wrong Token" });
      console.log(decoded.name);
      req.name = decoded.name;
      next();
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const checkRole = (role) => async (req, res, next) => {
  let { name } = req;

  let collection;

  if (role === "admin") {
    collection = await db.collection("admin");
  } else if (role === "member") {
    collection = await db.collection("members");
  }

  const user = await collection.findOne({ name });

  if (!user) {
    return res.status(404).json("Sorry you do not have access to this route");
  }
  req.user = user;
  next();
};

export { auth, checkRole };
