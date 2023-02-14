import * as dotenv from 'dotenv'
dotenv.config()

export default async function handler(request, response) {
  const { city } = request.body

  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`
    )

    if (res.ok) {
      const data = await res.json()
      console.log(data)

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
