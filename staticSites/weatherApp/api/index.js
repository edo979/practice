import * as dotenv from 'dotenv'
dotenv.config()

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(400).end()
  if (request.headers['content-type'] !== 'application/json')
    return response.status(400).end()

  const { lat, lon } = request.body
  if (typeof lat !== 'number' || typeof lon !== 'number')
    return response.status(400).end()

  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
    )

    if (res.ok) {
      const data = await res.json()
      return response.status(200).json(data)
    }

    return response.status(400).end()
  } catch {
    return response.status(500).end()
  }
}
