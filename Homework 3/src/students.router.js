import { Router } from "express";
import { getAllStudents, getStudentById } from "./students.js";

export const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
  try {
    const filter = req.query;

    const students = await getAllStudents(filter);

    return res.json(students);
  } catch (error) {
    return res.status(400).statusMessage({ msg: error.message });
  }
});

studentRouter.get("/:id", async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const foundStudent = await getStudentById(studentId);

    return res.json(foundStudent);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
