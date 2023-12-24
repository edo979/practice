import * as v2 from 'firebase-functions/v2'

type Indexable = { [key: string]: any }

export const helloworld = v2.https.onRequest((request, response) => {
  debugger
  const name = request.params[0]
  const items: Indexable = { lamp: 'This is a lamp', chair: 'Good chair' }
  const message = items[name]

  response.send(`<h1>${message}</h1>`)
})
