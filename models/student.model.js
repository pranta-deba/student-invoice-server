import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: {
      type: {
        dd: { type: String, required: true },
        mm: { type: String, required: true },
        yyyy: { type: String, required: true },
      },
      required: true,
    },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    studentClass: { type: String, required: true },
    formFee: { type: Boolean, default: false },
    advancePayment: { type: Number, default: 0 },
    classFee: { type: Number, required: true },
    roll: { type: Number, required: true },
    due: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
