import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on('connection', (socket) => {
    console.log('a user is connected')

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ sender, receiverId, text }) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit('getMessage', {
            sender,
            text
        })
    })
    
    socket.on('updateUser', ({ blockedId }) => {
        const user = getUser(blockedId)
        io.to(user.socketId).emit('update', {
            blockedId
        })
    })
    
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })

})

httpServer.listen(8500);