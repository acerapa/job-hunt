import { Router } from "express";
const router = Router();

import userRoutes from "./user-routes";
import authRoute from "./auth-routes";

router.use("/users", userRoutes);
router.use("/auth", authRoute);

export default router;
