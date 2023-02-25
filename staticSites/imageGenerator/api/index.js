import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.createImage({
    prompt: 'electrons inside the computer in futuristic style',
    n: 1,
    size: '256x256',
  })

  return res.json({ image_url: response.data.data[0].url })
}
