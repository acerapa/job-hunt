import { Router } from "express";
import { register } from "../controllers/UserController";
import { validateBody } from "../middlewares/request-validators";
// import { UserCreationSchema } from "../validators";
import { UserCreationSchema } from '@shared/pack'

const router = Router();

router.post("/register", validateBody(UserCreationSchema), register);

export default router;
