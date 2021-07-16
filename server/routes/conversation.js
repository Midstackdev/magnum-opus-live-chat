import express from 'express'
import * as controller from '../controllers/conversation.js'
import { jwtCheck } from '../services/auth.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', [jwtCheck, auth], controller.index)
router.get('/:id', [jwtCheck, auth], controller.show)
router.post('/', [jwtCheck, auth], controller.create)

export default router