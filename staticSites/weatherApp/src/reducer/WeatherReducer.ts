import { GeolocationT } from '../hooks/WeatherContext'

export function weatherReducer(
  state: GeolocationT,
  action: { type: string; payload: GeolocationT }
) {
  switch (action.type) {
    case 'change': {
      return { ...action.payload }
    }

    default: {
      return state
    }
  }
}
