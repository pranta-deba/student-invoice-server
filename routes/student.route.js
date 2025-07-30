import express from "express";
import {
  getSingleStudentByRollAndClass,
  registerStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/register", registerStudent);
router.get("/single-student", getSingleStudentByRollAndClass);

export default router;
