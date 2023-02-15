import * as dotenv from 'dotenv'
dotenv.config()

export default async function handler(request, response) {
  const { city } = request.body

  try {
    // const res = await fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`
    // )

    if (true) {
      //const data = await res.json()
      const data = [
        {
          name: 'Goražde',
          local_names: {
            tr: 'Gorajde',
            sq: 'Gorazhda',
            lt: 'Goraždė',
            hr: 'Goražde',
            sr: 'Горажде',
            ru: 'Горажде',
            ja: 'ゴラジュデ',
            uk: 'Горажде',
            zh: '戈拉日代',
            fa: 'گراژده',
          },
          lat: 43.6673112,
          lon: 18.9765501,
          country: 'BA',
          state: 'Federation of Bosnia and Herzegovina',
        },
        {
          name: 'Goražde',
          lat: 43.66757215,
          lon: 18.980829116325108,
          country: 'BA',
          state: 'Federation of Bosnia and Herzegovina',
        },
        {
          name: 'Goražde',
          local_names: { sr: 'Горажде' },
          lat: 42.8845361,
          lon: 19.9227157,
          country: 'ME',
        },
      ]
      //console.log(data)

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
