import express from "express";
import {
  getSingleStudentByRollAndClass,
  registerStudent,
  studentPayment,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/register", registerStudent);
router.get("/single-student", getSingleStudentByRollAndClass);
router.put("/student-payment", studentPayment);

export default router;
