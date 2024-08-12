import { Router } from "express";
const router = Router();

import companyRoutes from "./company-routes";
import userRoutes from "./user-routes";
import authRoute from "./auth-routes";

router.use("/users", userRoutes);
router.use("/auth", authRoute);
router.use("/company", companyRoutes)

export default router;
