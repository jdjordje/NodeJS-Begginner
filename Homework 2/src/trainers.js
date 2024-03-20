import { DataService } from "./data.service.js";
import { Trainer } from "./trainer.model.js";
import { createPath } from "../utils.js";


const TRAINER_PATH = createPath(["data", "trainer.json"]);

// 1. Get all trainers.
export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFile(TRAINER_PATH);
  return trainers;
};

//Save trainers

export const saveTrainer = async (trainer) => {
  await DataService.saveJSONFile(TRAINER_PATH, trainer);
};

// 2. Get trainer by id.

export const getTrainerById = async (trainerId) => {
  const trainers = await getAllTrainers();

  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

  if (!foundTrainer) throw new Error(`Trainer not found`);

  console.log(foundTrainer);
  return foundTrainer;
};

// 3. Update Trainer Info.

export const updateTrainerInfo = async (trainerId, updatedData) => {
  const trainers = await getAllTrainers();

  if (!trainers.some((trainer) => trainer.id === trainerId)) throw new Error(`Trainer not found`);
    
  const updatedTrainer = trainers.map((trainer) => {
    if (trainer.id === trainerId) {
      return { ...trainer, ...updatedData };
    } else {
      return trainer;
    }
  });

  await saveTrainer(updatedTrainer);
};

// 4. Add a trainer.
export const addTrainer = async (firstName, lastName, email, timeEmployed, coursesFinished) => {
    const trainers = await getAllTrainers();

    const newTrainer = new Trainer(firstName, lastName, email, timeEmployed, coursesFinished);

    const updatedTrainers = [...trainers, newTrainer];
   
    await saveTrainer(updatedTrainers);
};

// 5. Delete trainer.
export const deleteTrainer = async trainerId =>{
    const trainers = await getAllTrainers();

    const deleteTrainer = trainers.filter(trainer => trainer.id !== trainerId);

    if(trainers.length === deleteTrainer.length) throw new Error(`Trainer not found in database`);

    await saveTrainer(deleteTrainer);
}


// 6. Delete all trainers.
export const deleteAll = async () =>{
    await saveTrainer([]);
}