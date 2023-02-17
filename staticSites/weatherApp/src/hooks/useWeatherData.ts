import { useEffect, useState } from 'react'
import { dataT } from '../data'
import { getIcon, getWindDirection } from '../util/adapters'
import { useWeatherContex } from './WeatherContext'

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
  const { geolocationData } = useWeatherContex()

  // load from LS or get new data
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)

      const dataLS = localStorage.getItem('weatherData')

      if (!dataLS) {
        // no data in LS --> get from server
        const rawData = await fetchNewDataFromServer()

        if (rawData !== null) {
          mapRawDataToState(rawData)
        } else {
          setIsError(true)
        }
      } else {
        const rawDataLS = JSON.parse(dataLS) as dataT
        loadingByDateTime(rawDataLS)
      }

      setIsLoading(false)
    }

    getData()
  }, [])

  // get new data on geolocation change
  useEffect(() => {
    // skip first load
    if (!data) return

    async function getData() {
      setIsLoading(true)

      const rawData = await fetchNewDataFromServer()

      if (rawData !== null) {
        mapRawDataToState(rawData)
      } else {
        setIsError(true)
      }

      setIsLoading(false)
    }

    getData()
  }, [geolocationData])

  async function fetchNewDataFromServer() {
    console.log('fetch from server')

    try {
      const res = await fetch('api', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: geolocationData.lat,
          lon: geolocationData.lon,
        }),
      })

      if (res.ok) {
        const data = (await res.json()) as dataT
        saveToLS(data)
        return data
      } else {
        return null
      }
    } catch {
      return null
    }
  }

  function saveToLS(data: dataT) {
    try {
      localStorage.setItem('weatherData', JSON.stringify(data))
    } catch {
      return null
    }
  }

  function mapRawDataToState(data: dataT) {
    const currentDate = new Date()
    const timeZone = data.city.timezone * 1000

    const currentWeather =
      data.list.find((day) => {
        const dateTimeInterval = new Date(day.dt_txt).getTime() + timeZone
        const deltaTime = currentDate.getTime() - dateTimeInterval

        // use weather info in interval less than 1h and 30min
        // or fall back to first interval
        if (deltaTime <= 30 * 60 * 1000) return true
        return false
      }) || data.list[0]

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
      currentTemp: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      windDir: getWindDirection(currentWeather.wind.deg),
      windSpeed: Math.round(currentWeather.wind.speed * 3.6),
      pressure: currentWeather.main.pressure,
      icon: getIcon(currentWeather.weather[0].id),
    })
  }

  async function loadingByDateTime(rawDataLS: dataT) {
    const dateLastVisit = new Date(rawDataLS.list[0].dt_txt)
    const dateNow = new Date()
    const deltaTime =
      dateNow.getTime() -
      (dateLastVisit.getTime() + rawDataLS.city.timezone * 1000)

    const isIn24h = deltaTime / (1000 * 60 * 60) < 24
    const isSameDay = dateNow.getDate() === dateLastVisit.getDate()

    if (deltaTime < 0 || (isIn24h && isSameDay)) {
      // Fetch from LS
      mapRawDataToState(rawDataLS)
    } else {
      const rawData = await fetchNewDataFromServer()
      if (rawData !== null) {
        mapRawDataToState(rawData)
      } else {
        setIsError(true)
      }
    }
  }

  return { data, isLoading, isError }
}
