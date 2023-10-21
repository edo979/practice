import express from 'express'

const app = express()
app.use(express.json())

app.get('/notes', (req, res) => {
  res.send('Welcome!')
})

export default app
