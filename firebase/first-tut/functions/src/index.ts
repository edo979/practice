import * as v2 from 'firebase-functions/v2'
import * as v1 from 'firebase-functions/v1'

type Indexable = { [key: string]: any }

export const helloworld = v2.https.onRequest((request, response) => {
  debugger
  const name = request.params[0]
  const items: Indexable = { lamp: 'This is a lamp', chair: 'Good chair' }
  const message = items[name]

  response.send(`<h1>${message}</h1>`)
})

type Sku = { name: string; usd: number; eur?: number }
const USD_TO_EUROS = 0.95

export const newsku = v1.firestore
  .document('/inventory/{sky}')
  .onCreate((snapshot) => {
    const data = snapshot.data() as Sku
    const eur = data.usd * USD_TO_EUROS
    return snapshot.ref.update({ eur })
  })
