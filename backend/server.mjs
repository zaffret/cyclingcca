import express from "express";
import cors from "cors";
import "dotenv/config.js";
import login from "./routes/login.mjs";
import members from "./routes/members.mjs";
import admin from "./routes/admin.mjs";
import events from "./routes/events.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/members", members);
app.use("/admin", admin);
app.use("/events", events);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
