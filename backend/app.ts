import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
