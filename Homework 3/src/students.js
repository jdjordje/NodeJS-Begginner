import { DataService } from "./data.service.js";
import { createPath } from "../utils.js";

const FILE_PATH = createPath(["data", "students.json"]);

export const getAllStudents = async (filter) => {
  let students = await DataService.readJSONFile(FILE_PATH);

  if (filter?.gender) {
    if (filter.gender === "Male" || filter.gender === "Female") {
      students = students.filter((student) => student.gender === filter.gender);
    } else {
      return `Invalid input!`;
    }
  }

  if (filter?.age) {
    if (filter.age === "descending" || filter.age === "ascending") {
      if (filter.age === "descending") {
        students = students.sort((a, b) => b.age - a.age);
      }

      if (filter.age === "ascending") {
        students = students.sort((a, b) => a.age - b.age);
      }
    } else {
      return `Invalid input!`;
    }
  }

  if (filter?.averageGrade) {
    if (filter.averageGrade === "descending" || filter.averageGrade === "ascending") {
      if (filter.averageGrade === "descending") {
        students = students.sort((a, b) => b.averageGrade - a.averageGrade);
      }
      if (filter.averageGrade === "ascending") {
        students = students.sort((a, b) => a.averageGrade - b.averageGrade);
      }
    } else {
      return `Invalid input!`;
    }
  }

  return students;
};

export const getStudentById = async (studentId) => {
  const students = await getAllStudents();

  const foundStudent = students.find((student) => student.id === studentId);

  if (!foundStudent) throw new Error(`Student not found`);

  return foundStudent;
};
