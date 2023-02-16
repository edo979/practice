import * as dotenv from 'dotenv'
dotenv.config()

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(400).end()
  if (request.headers['content-type'] !== 'application/json')
    return response.status(400).end()

  const { city } = request.body

  if (typeof city !== 'string') return response.status(400).end()

  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`
    )

    if (res.ok) {
      const data = await res.json()

      return response.status(200).json(
        data.map((city) => ({
          lat: city.lat,
          lon: city.lon,
          country: city.country,
          name: city.name,
        }))
      )
    }

    return response.status(400).end()
  } catch {
    return response.status(500).end()
  }
}
