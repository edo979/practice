import { createServer } from 'http'
import path from 'path'
import express from 'express'
import { Server } from 'socket.io'
import { addUser, removeUser } from './utils/users'

const publicDirPath = path.join(__dirname, '../public')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.on('join', (options: { username: string; room: string }, cb) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (!user) return cb('Server Error, try again!')
    if (error) return cb(error)

    socket.join(user.room)
    socket.emit('message', `Welcome ${user.username}`)
    socket.broadcast
      .to(user.room)
      .emit('message', `${user.username} has joined!`)
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', `${user.username} has left!`)
    }
  })

  socket.on('sendMessage', (message, cb) => {
    io.emit('message', message)

    cb()
  })
})

export default httpServer
