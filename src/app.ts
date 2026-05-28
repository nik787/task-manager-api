import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./api/health/routes.js";
import userRoutes from "./api/auth/routes.js";
import userCountsRoutes from "./api/debug/routes.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/auth", userRoutes);
app.use("/debug/users-count", userCountsRoutes);

export default app