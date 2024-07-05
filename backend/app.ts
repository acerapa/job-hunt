import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkConnection } from "./src/database";

dotenv.config();

// check connection
checkConnection();

const app: Application = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use api routes
import apiRoutes from "./src/routes/api-routes";
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
