import { Router } from "express";
import { getAllTasks, createTask, findTask, editTask, deleteAll, deleteTask } from "./tasks.js";

export const taskRouter = Router();

//1. Get all tasks

taskRouter.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const tasks = await getAllTasks(filters);

    
    return res.json(tasks);
  } catch (error) {
  
    return res.status(500).json({ msg: error.message });
  }
});

//2. Create Task

taskRouter.post("/", async (req, res) => {
  try {
    const { text, author } = req.body;

    if (!text || !author) throw new Error(`Invalid data!`);

    const newTask = await createTask(text, author);

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

//3. Get task by id

taskRouter.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const foundTask = await findTask(taskId);

    return res.json(foundTask);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

//4. Update task

taskRouter.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;

    if (updatedData.id) throw new Error("Invalid update data!");

    await editTask(taskId, updatedData);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});


//6. Delete all tasks

taskRouter.delete("/", async(req,res)=>{
    try {
        await deleteAll();

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})

//5. Delete task

taskRouter.delete("/:id",async (req,res)=>{
    try {
        const taskId = req.params.id;

        await deleteTask(taskId);
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }
)

