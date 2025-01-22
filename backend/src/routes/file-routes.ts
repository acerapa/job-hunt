import { Router } from 'express'
import { serveFile } from '../controllers/FileController'

const router = Router()

router.get('/:id', serveFile)

export default router
