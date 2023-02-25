import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  if (
    req.method !== 'POST' ||
    req.headers['content-type'] !== 'application/json'
  )
    return res.status(400).end()

  const { prompt } = req.body
  if (typeof prompt !== 'string' || prompt.trim() === '')
    return res.status(400).end()

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '256x256',
  })

  return res.json({ image_url: response.data.data[0].url })
}
