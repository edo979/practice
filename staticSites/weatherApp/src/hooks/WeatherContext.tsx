import { createContext, ReactNode, useContext } from 'react'

export type GeolocationT = {
  lat: string
  lon: string
  country: string
  name: string
}

type WeatherDataContextT = {
  geolocationData: GeolocationT
  setGeolocationData: (newData: GeolocationT) => void
}

const WeatherDataContext = createContext({} as WeatherDataContextT)

export function useWeatherContex() {
  return useContext(WeatherDataContext)
}

export function WeatherDataContextProvider({
  children,
}: {
  children: ReactNode
}) {
  let geolocationData: GeolocationT = {
    lat: '43.6673112',
    lon: '18.9765501',
    country: 'BA',
    name: 'Goražde',
  }

  const setGeolocationData = (newData: GeolocationT) =>
    (geolocationData = { ...newData })

  return (
    <WeatherDataContext.Provider
      value={{ geolocationData, setGeolocationData }}
    >
      {children}
    </WeatherDataContext.Provider>
  )
}
