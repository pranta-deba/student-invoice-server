import { Student } from "../models/student.model.js";

const extractClassPrefix = (studentClass) => {
  return (
    studentClass.match(/^(IV|V|VI|VII|VIII|IX|X|XI|XII|SSC|HSC)/)?.[0] || null
  );
};

export const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", studentClass, roll } = req.query;

    const query = {};

    // Search by studentName, fatherName, motherName, or roll
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { studentName: searchRegex },
        { fatherName: searchRegex },
        { motherName: searchRegex },
        { roll: isNaN(search) ? undefined : parseInt(search) },
      ].filter(Boolean);
    }

    // Filter by class
    if (studentClass) {
      query.studentClass = studentClass;
    }

    // Filter by roll
    if (roll) {
      query.roll = parseInt(roll);
    }

    const total = await Student.countDocuments(query);

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: students,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get all students error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
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

export const studentPayment = async (req, res) => {
  const { studentId, payment } = req.body;

  try {
    const student = await Student.findOneAndUpdate(
      { _id: studentId },
      { $inc: { advancePayment: parseInt(payment), due: -parseInt(payment) } },
      { new: true }
    );
    return res.status(200).json({ success: true, student });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
