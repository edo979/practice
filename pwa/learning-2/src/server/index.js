import express from 'express'
import cors from 'cors'
import { db } from '../firebase/firebase-config.js'
import { addDoc, collection, getDocs } from 'firebase/firestore'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/posts', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'))
    const data = snapshot.docs.map((doc) => doc.data())

    res.send(JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
})

app.post('/posts', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      id: req.body.id,
      title: req.body.title,
      location: req.body.location,
      image: req.body.image,
    })

    res.status(200).send({ id: req.body.id })
  } catch (error) {
    res.status(500)
  }

  res.send()
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
