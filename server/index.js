import express from 'express'
import keys from './config/keys.js'
import { connectToDB } from './config/db.js'
import { setEnvironment } from './config/env.js'
import { registerRoutes } from './routes/index.js'
import './socket/index.js'

const app = express()
const PORT = keys.port

connectToDB()
setEnvironment(app)
registerRoutes(app)

// Qweasd123#

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})