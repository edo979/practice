import { createServer } from 'http'
import path from 'path'
import express from 'express'
import { Server } from 'socket.io'
import { addUser, getUser, getUsers, removeUser } from './utils/users'

const publicDirPath = path.join(__dirname, '../public')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
  socket.on('join', (options: { username: string; room: string }, cb) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) return cb(error)
    if (!user) return cb('Server Error, try again!')

    socket.join(user.room)
    socket.emit('message', `Welcome ${user.username}`)
    socket.broadcast
      .to(user.room)
      .emit('message', `${user.username} has joined!`)

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsers(user.room),
    })
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      socket.to(user.room).emit('message', `${user.username} has left!`)
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsers(user.room),
      })
    }
  })

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id)

    if (!user) return cb({ error: 'Server Error, cant find user!' })
    io.to(user.room).emit('message', message)

    cb()
  })
})

export default httpServer
