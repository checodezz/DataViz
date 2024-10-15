import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import Router from "./routes/route.js"
import connectDb from "./db/db.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDb()

app.get('/', (req, res) => {
    res.send('Hello, ES6+ Node.js with Express!');
});

app.use("/", Router)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});