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

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)

    // translate to english
    const translateRes = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Translate the phrase from Croatian language to English language: "${prompt}"`,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const response = await openai.createImage({
      prompt: translateRes.data.choices[0].text.trim(),
      n: 1,
      size: '256x256',
    })

    return res.json({ image_url: response.data.data[0].url })
  } catch (error) {
    return res.status(500).end()
  }
}
