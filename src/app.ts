import express from "express";
import cors from "cors";
import helmet from "helmet";
import { prisma } from "./lib/prisma.js";


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/debug/users-count", (req, res) => {
  const usersCount = prisma.user.count()
  res.json(usersCount);
});

export default app