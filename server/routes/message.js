import express from 'express'
import * as controller from '../controllers/message.js'
import { jwtCheck } from '../services/auth.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', [jwtCheck, auth], controller.index)
router.post('/:id', [jwtCheck, auth], controller.create)

export default router