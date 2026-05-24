import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { config } from "./config/config.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});