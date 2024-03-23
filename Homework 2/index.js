import express from "express";
import { getAllTrainers, getTrainerById, updateTrainerInfo, addTrainer, deleteTrainer, deleteAll } from "./src/trainers.js";
import { createPath } from "./utils.js";

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || "0.0.0.0";

const STATIC_HOME = createPath(["public","index.html"])

const app = express();
app.use(express.json());


//Add a public folder in the project that will serve an `index.html` statically on route `/home`
app.use('/home', express.static(STATIC_HOME))

// 1. Get all trainers.
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();

    return res.json(trainers);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
// 2. Get trainer by id.
app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    const trainerById = await getTrainerById(trainerId);

    return res.json(trainerById);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

// 3. Update Trainer Info.
app.patch("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const updatedInfo = req.body;

    if (updatedInfo.id) throw new Error(`Invalid data entry`);

    await updateTrainerInfo(trainerId, updatedInfo);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

// 4. Add a trainer.
app.post("/trainers", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed, coursesFinished } = req.body;

    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished) throw new Error(`Invalid data input`);

    const newTrainer = await addTrainer(firstName, lastName, email, timeEmployed, coursesFinished);

    return res.sendStatus(201).json(newTrainer)

  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

// 6. Delete all trainers.

app.delete("/trainers/delete", async(req,res)=>{
    try {
        await deleteAll();

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})


// 5. Delete trainer.

app.delete("/trainers/:id", async(req,res)=>{
    try {
        const trainerId = req.params.id;
    
        await deleteTrainer(trainerId);
        
        return res.sendStatus(204);
    
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }
})




app.listen(PORT, HOST, () => {
  console.log(`up and running`);
});
