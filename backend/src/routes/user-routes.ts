import { Router } from "express"
import { all, getOne, register, update } from "../controllers/UserController"
import { validateBody } from "../middlewares/request-validators"
import { UserCreationSchema, PartialCombinedUserUpdateSchema } from '@shared/pack/dist'

const router = Router()

router.get("/all", all)
router.get("/:id", getOne)
router.post("/register", validateBody(UserCreationSchema), register)
router.post("/update", validateBody(PartialCombinedUserUpdateSchema), update)

export default router
