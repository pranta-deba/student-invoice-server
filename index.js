import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./utils/dbConnect.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//! Middleware
app.use(cors());
app.use(express.json());

//! Connect to DB
dbConnect();

//! Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
