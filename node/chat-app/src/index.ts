import { createServer } from 'http'
import path from 'path'
import express from 'express'
import { Server } from 'socket.io'

const publicDirPath = path.join(__dirname, '../public')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(publicDirPath))
