

import express from "express";
import cors from "cors";
import morgan from 'morgan'
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to CapStone!");
});

// Added for the S3 upload route
import uploadRoutes from './routes/uploadRoutes.js';

import videoRoutes from './routes/videoRoutes.js'

app.use('/uploads', uploadRoutes); 
app.use('/videos', videoRoutes); 



app.get("*", (req, res) => {
    res.status(404).json({ success: false, data: { error: "Page is not found!" } });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, data: { error: 'Internal Server Error' } });
});

export default app;