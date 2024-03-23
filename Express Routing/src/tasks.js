import { DataService } from "./data.service.js";
import { createPath } from "../utils.js";
import { Task } from "./task.model.js";

const TASKS_PATH = createPath(["data", "tasks.json"]);

//get all tasks
export const getAllTasks = async (filters) => {
  let tasks = await DataService.readJSONFile(TASKS_PATH);
  
  if (filters?.author) {
    tasks = tasks.filter(task => task.author === filters.author);
  }

  if (filters?.isFinished) {
    tasks = tasks.filter(task => {
      if (filters.isFinished === "true") return task.isFinished;
      if (filters.isFinished === "false") return !task.isFinished;
    });
  }

  return tasks;
};
  

//save tasks
export const saveTasks = async (tasks) => {
  await DataService.saveJSONFile(TASKS_PATH, tasks);
};

//create taks
export const createTask = async (text, author) => {
  const tasks = await getAllTasks();

  const newTask = new Task(text, author);

  const updatedList = [...tasks, newTask];

  await saveTasks(updatedList);

  return newTask;
};

//find task by id

export const findTask = async (taskId) => {
  const tasks = await getAllTasks();

  const foundTask = tasks.find((task) => task.id === taskId);

  if (!foundTask) throw new Error(`Task not found!`);

  return foundTask;
};

//edit task by id

export const editTask = async (taskId, updatedData) => {
  const tasks = await getAllTasks();

  if (!tasks.some((task) => task.id === taskId)) throw new Error(`Task not found!`);

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, ...updatedData };
    } else {
      return task;
    }
  });

  await saveTasks(updatedTasks);
};

//delete task
export const deleteTask = async (taskId) => {
  const tasks = await getAllTasks();

  const filteredTasks = tasks.filter((task) => task.id !== taskId);

  if (tasks.length === filteredTasks.length) throw new Error(`Task not found!`);

  await saveTasks(filteredTasks);
};

//delete all

export const deleteAll = async () => [await saveTasks([])];
