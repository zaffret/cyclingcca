import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import { auth, checkRole } from "../auth/auth.mjs";
import {
  isNotString,
  isNotNumber,
  isEndBeforeStart,
  isRegistrationClosingInvalid,
} from "../validation/validateInputs.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("events");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/member/:id", auth, checkRole("member"), async (req, res) => {
  let collection = await db.collection("events");
  let memberId = new ObjectId(req.params.id);

  let results = await collection
    .find({ member_registered: memberId })
    .toArray();
  if (!results.length) {
    return res.status(404).send("No events found for this member.");
  }
  res.send(results).status(200);
});

router.post("/", auth, checkRole("admin"), async (req, res) => {
  if (isNotNumber(req.body.member_cap, "member capacity")) {
    return res.status(400).json({
      message: isNotNumber(req.body.member_cap, "member capacity"),
    });
  }

  const endError = isEndBeforeStart(req.body.start, req.body.end);
  if (endError) {
    return res.status(400).json({ message: endError });
  }

  const registrationClosingError = isRegistrationClosingInvalid(
    req.body.start,
    req.body.end,
    req.body.registration_closing_time
  );
  if (registrationClosingError) {
    return res.status(400).json({ message: registrationClosingError });
  }

  const newEvent = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    location: req.body.location,
    route: req.body.route || "",
    description: req.body.description || "",
    note: req.body.note || "",
    member_cap: req.body.member_cap,
    member_registered: [],
    registration_closing_time: req.body.registration_closing_time,
  };

  let collection = await db.collection("events");
  await collection.insertOne(newEvent);
  res.send(newEvent).status(201);
});

router.patch("/:id", auth, checkRole("admin"), async (req, res) => {
  if (isNotNumber(req.body.member_cap, "member capacity")) {
    return res.status(400).json({
      message: isNotNumber(req.body.member_cap, "member capacity"),
    });
  }

  const endError = isEndBeforeStart(req.body.start, req.body.end);
  if (endError) {
    return res.status(400).json({ message: endError });
  }

  const registrationClosingError = isRegistrationClosingInvalid(
    req.body.start,
    req.body.end,
    req.body.registration_closing_time
  );
  if (registrationClosingError) {
    return res.status(400).json({ message: registrationClosingError });
  }
  const query = { _id: new ObjectId(req.params.id) };
  let collection = await db.collection("events");

  let record = await collection.findOne(query);
  if (!record) {
    return res.status(404).send("Event not found.");
  }

  const updates = {
    $set: {
      title: req.body.title || record.title,
      start: req.body.start || record.start,
      end: req.body.end || record.end,
      location: req.body.location || record.location,
      route: req.body.route || record.route,
      description: req.body.description || record.description,
      note: req.body.note || record.note,
      member_cap: req.body.member_cap || record.member_cap,
      registration_closing_time:
        req.body.registration_closing_time || record.registration_closing_time,
    },
  };

  await collection.updateOne(query, updates);
  const updatedEvent = await collection.findOne(query);
  res.send(updatedEvent).status(200);
});

router.delete("/:id", auth, checkRole("admin"), async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let collection = await db.collection("events");

  let result = await collection.deleteOne(query);
  if (result.deletedCount === 0) {
    return res.status(404).send("Event not found.");
  }
  res.send({ message: "Event deleted successfully." }).status(200);
});

router.post("/:id/register", auth, checkRole("member"), async (req, res) => {
  const eventId = new ObjectId(req.params.id);
  const memberId = req.user._id;

  let collection = await db.collection("events");
  let event = await collection.findOne({ _id: eventId });

  if (!event) {
    return res.status(404).send("Event not found.");
  }

  if (event.member_registered.some((id) => id.equals(memberId))) {
    return res.status(400).send("Member already registered for this event.");
  }

  if (event.member_registered.length >= event.member_cap) {
    return res.status(400).send("Event capacity reached.");
  }

  await collection.updateOne(
    { _id: eventId },
    { $push: { member_registered: memberId } }
  );

  res.send({ message: "Member registered successfully." }).status(200);
});

router.post("/:id/withdraw", auth, checkRole("member"), async (req, res) => {
  const eventId = new ObjectId(req.params.id);
  const memberId = req.user._id;

  let collection = await db.collection("events");
  let event = await collection.findOne({ _id: eventId });

  if (!event) {
    return res.status(404).send("Event not found.");
  }

  if (!event.member_registered.some((id) => id.equals(memberId))) {
    return res.status(404).send("Member not registered for this event");
  }

  await collection.updateOne(
    { _id: eventId },
    { $pull: { member_registered: memberId } }
  );

  res.send({ message: "Member withdrawn successfully." }).status(200);
});

export default router;
