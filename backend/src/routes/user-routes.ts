import { Router } from "express"
import { all, getOne, register, update } from "../controllers/UserController"
import { validateBody } from "../middlewares/request-validators"
import { UserCreationSchema, CombinedUserUpdateSchema } from '@shared/pack'

const router = Router()

router.get("/all", all)
router.get("/:id", getOne)
router.post("/update", validateBody(CombinedUserUpdateSchema), update)
router.post("/register", validateBody(UserCreationSchema), register)

export default router
