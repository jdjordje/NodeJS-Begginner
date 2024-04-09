import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { globalRouter } from "./src/const/route.const.js";

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`

const app = express();

app.use(express.json());

app.use("/api",globalRouter)

app.listen(process.env.PORT, process.env.HOST, async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`connected`)
    } catch (error) {
        console.error(error)
    }
})