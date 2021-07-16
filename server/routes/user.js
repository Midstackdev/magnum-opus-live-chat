import express from 'express'
import * as controller from '../controllers/user.js'
import { jwtCheck } from '../services/auth.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', [jwtCheck, auth], controller.index)
router.post('/register', [jwtCheck, auth], controller.register)
router.post('/block', [jwtCheck, auth], controller.block)
router.get('/:id', [jwtCheck, auth], controller.show)

export default router