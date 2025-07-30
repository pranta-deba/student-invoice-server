import { Student } from "../models/student.model.js";

const extractClassPrefix = (studentClass) => {
  return (
    studentClass.match(/^(IV|V|VI|VII|VIII|IX|X|XI|XII|SSC|HSC)/)?.[0] || null
  );
};

export const registerStudent = async (req, res) => {
  try {
    const data = req.body;
    const classPrefix = extractClassPrefix(data.studentClass);

    if (!classPrefix) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid class prefix" });
    }

    const lastStudent = await Student.find({
      studentClass: { $regex: `^${classPrefix}` },
    })
      .sort({ roll: -1 })
      .limit(1);

    const lastRoll = lastStudent.length ? lastStudent[0].roll : 0;
    data.roll = lastRoll + 1;
    data.due = data.classFee - data.advancePayment;

    const newStudent = new Student(data);
    await newStudent.save();

    return res.status(201).json({ success: true, student: newStudent });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleStudentByRollAndClass = async (req, res) => {
  try {
    const { roll, studentClass } = req.query;
    const student = await Student.findOne({
      roll: parseInt(roll),
      studentClass,
    });
    return res.status(200).json({ success: true, student });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
