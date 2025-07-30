import mongoose from "mongoose";

const dobSchema = new mongoose.Schema({
  dd: { type: String, required: true },
  mm: { type: String, required: true },
  yyyy: { type: String, required: true },
});

const studentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: dobSchema, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    studentClass: { type: String, required: true },
    section: { type: String, default: "" },
    formFee: { type: Boolean, default: false },
    advancePayment: { type: Number, required: true },
    classFee: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
