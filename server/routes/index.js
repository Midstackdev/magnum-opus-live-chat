import userRoutes from './user.js'
import conversatonRoutes from './conversation.js'
import messageRoutes from './message.js'

export const registerRoutes = (app) => {
    app.use('/api/users', userRoutes)
    app.use('/api/conversation', conversatonRoutes)
    app.use('/api/message', messageRoutes)
}