import { useEffect, useState } from 'react'
import { dataT } from '../data'
import { getIcon, getWindDirection } from '../util/adapters'

type WeatherDataT = {
  daysWeather: {
    day: string
    temp: number
    weatherCode: number
  }[]
  city: string
  currentTemp: number
  humidity: number
  windDir: string
  windSpeed: number
  pressure: number
  icon: string | undefined
}

export function useWeatherData() {
  const [data, setData] = useState<WeatherDataT>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)

      //check local storage for data
      // if no data
      // fetch and save in storage
      // return data
      //if data present and valid
      // filter data and return
      const dataLS = localStorage.getItem('weatherData')
      if (!dataLS) {
        console.log('before fetch')
        const res = await fetch('api')

        if (res.ok) {
          const data = await res.json()
          localStorage.setItem('weatherData', JSON.stringify(data))
          mapDataFromResponse(data)
        } else {
          setIsError(true)
        }
      } else {
        mapDataFromResponse(JSON.parse(dataLS))
      }

      setIsLoading(false)
    }

    getData()
  }, [])

  function mapDataFromResponse(data: dataT) {
    setData({
      daysWeather: data.list
        .filter((day, i, days) => {
          return day.dt_txt.split(' ')[0] !== days[0].dt_txt.split(' ')[0]
        })
        .filter((day) => day.dt_txt.endsWith('12:00:00'))
        .map((day) => ({
          day: new Date(day.dt_txt).toLocaleDateString('sr-Latn', {
            weekday: 'short',
          }),
          temp: day.main.feels_like,
          weatherCode: day.weather[0].id,
        })),
      city: data.city.name,
      currentTemp: Math.round(data.list[0].main.feels_like),
      humidity: data.list[0].main.humidity,
      windDir: getWindDirection(data.list[0].wind.deg),
      windSpeed: Math.round(data.list[0].wind.speed * 3.6),
      pressure: data.list[0].main.pressure,
      icon: getIcon(data.list[0].weather[0].id),
    })
  }

  return { data, isLoading, isError }
}
