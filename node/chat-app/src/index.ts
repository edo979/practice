import { createServer } from 'http'
import path from 'path'
import express from 'express'
import { Server } from 'socket.io'

const publicDirPath = path.join(__dirname, '../public')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.on('sendMessage', (message, cb) => {
    io.emit('message', message)

    cb()
  })
})

httpServer.listen(3000, () => {
  console.log('Server start at port 3000')
})
