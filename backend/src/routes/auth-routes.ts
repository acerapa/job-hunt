import { Router } from "express";

const router = Router();
import { authenticate, refresh } from "../controllers/AuthController";

router.post("/login", authenticate);
router.post("/refresh", refresh);

export default router;
