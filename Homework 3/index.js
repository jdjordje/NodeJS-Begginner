import express from "express";
import { studentRouter } from "./src/students.router.js"

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || "0.0.0.0"

app.use("/students", studentRouter)

app.listen(PORT,HOST, ()=>{
    
})