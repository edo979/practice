import * as dotenv from 'dotenv'
dotenv.config()

export default async function handler(request, response) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=43.6685&lon=18.9749&appid=${process.env.API_KEY}&units=metric`
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
