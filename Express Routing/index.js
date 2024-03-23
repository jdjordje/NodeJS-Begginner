import express from "express";
import { taskRouter } from "./src/tasks.routes.js";
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/", async(req,res)=>{
    res.send(`<h1>Hello </h1>`)
})

app.use("/tasks", taskRouter)


app.listen(PORT,HOST, ()=>{
    console.log(`running`)
})