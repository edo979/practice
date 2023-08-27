import express from 'express'
import cors from 'cors'
import { db } from '../firebase/firebase-config.js'
import { collection, getDocs } from 'firebase/firestore'

const app = express()
app.use(cors())

app.get('/posts', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'))
    const data = snapshot.docs.map((doc) => doc.data())

    res.send(JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
