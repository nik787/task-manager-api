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

app.get("/debug/users-count", async (req, res) => {
  const usersCount = await prisma.user.count()
  res.json({
    data: {
      count: usersCount
    }
  });
});

export default app