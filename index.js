import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./utils/dbConnect.js";
import userRoutes from "./routes/user.route.js";
import studentRoutes from "./routes/student.route.js";

//! Config
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//! Middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

//! Connect to DB
dbConnect();

//! Routes
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

//! Test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//! Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
