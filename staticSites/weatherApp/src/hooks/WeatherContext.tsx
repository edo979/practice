import { createContext, ReactNode, useContext, useReducer } from 'react'
import { weatherReducer } from '../reducer/WeatherReducer'

export type GeolocationT = {
  lat: string
  lon: string
  country: string
  name: string
}

type WeatherDataContextT = {
  state: GeolocationT
  changeGeoLocation: (newData: GeolocationT) => void
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
  const [state, dispatch] = useReducer(weatherReducer, {
    lat: '43.6673112',
    lon: '18.9765501',
    country: 'BA',
    name: 'Goražde',
  })

  const changeGeoLocation = (newData: GeolocationT) =>
    dispatch({ type: 'change', payload: newData })

  return (
    <WeatherDataContext.Provider value={{ state, changeGeoLocation }}>
      {children}
    </WeatherDataContext.Provider>
  )
}
