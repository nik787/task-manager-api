import { Router } from "express";
import { prisma } from "../../lib/prisma.js";


const router = Router();

router.get("/", async (req, res) => {
  const usersCount = await prisma.user.count()
  res.json({
    data: {
      count: usersCount
    }
  });
});

export default router;