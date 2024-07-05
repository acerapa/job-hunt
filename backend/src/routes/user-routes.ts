import { Router } from "express";
import { register } from "../controllers/UserController";
import { validateBody } from "../middlewares/request-validators";
import { UserSchema } from "../validators/user";

const router = Router();

router.post("/register", validateBody(UserSchema), register);

export default router;
