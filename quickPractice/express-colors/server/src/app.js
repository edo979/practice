import express from 'express'
import cors from 'cors'
import { colors } from './data/colors.js'

const app = express()
const port = 3001

const corsOption = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOption))

app.get('/colors', (req, res) => {
  res.json(colors)
})

app.get('/colors/:name', (req, res) => {
  const color = colors.find(
    (color) => color.name.toLowerCase() === req.params.name
  )
  if (!color) return res.status(400).end()

  res.json(color)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
