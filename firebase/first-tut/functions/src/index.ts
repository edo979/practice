//import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
//import { onDocumentCreated } from 'firebase-functions/v2/firestore'

import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp()

// import * as v2 from 'firebase-functions/v2'
// import * as v1 from 'firebase-functions/v1'

//type Indexable = { [key: string]: any }

// export const helloworld = v2.https.onRequest((request, response) => {
//   debugger
//   const name = request.params[0]
//   const items: Indexable = { lamp: 'This is a lamp', chair: 'Good chair' }
//   const message = items[name]

//   response.send(`<h1>${message}</h1>`)
// })

//type Sku = { name: string; usd: number; eur?: number }
//const USD_TO_EUROS = 0.95

// export const newsku = v1.firestore
//   .document('/inventory/{sku}')
//   .onCreate((snapshot) => {
//     const data = snapshot.data() as Sku
//     const eur = data.usd * USD_TO_EUROS
//     return snapshot.ref.set({ eur, ...data }, { merge: true })
//   })

// export const newsku = onDocumentCreated('/inventory/{sky}', (event) => {
//   const eur = event.data?.data().usd * USD_TO_EUROS
//   return event.data?.ref.set({ eur }, { merge: true })
// })

export const newsku = onRequest(async (req, res) => {
  const usdFromQuery = req.query.usd as string
  const usd = parseFloat(usdFromQuery)

  const writeResult = await getFirestore()
    .collection('inventory')
    .add({ ...req.query, eur: usd * 0.5 })
  res.json({ result: writeResult.id })
})
