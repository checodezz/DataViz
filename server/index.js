import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import connectDb from "./db/db.js";
import cookieParser from "cookie-parser";
import { fetchSheetData } from "./dynamicSheetData/dataFetcher.js";

dotenv.config();

const app = express();

// Set up CORS options to allow all origins
const corsOptions = {
    origin: true, // Allows all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());

connectDb();
fetchSheetData();

app.get('/', (req, res) => {
    res.send('Hello, welcome to dataWiz dashboard !');
});

app.use("/", Router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
