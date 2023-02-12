export function getWindDirection(deg: number) {
  if (deg > 338 || deg <= 23) return 'S'
  if (deg > 23 && deg <= 68) return 'SI'
  if (deg > 68 && deg <= 113) return 'I'
  if (deg > 113 && deg <= 158) return 'JI'
  if (deg > 158 && deg <= 203) return 'J'
  if (deg > 203 && deg <= 248) return 'JZ'
  if (deg > 248 && deg <= 293) return 'Z'
  if (deg > 293 && deg <= 338) return 'SZ'
  return '???'
}

export function getIcon(id: number) {
  if (id >= 200 && id < 300) return 'thunderstorm'
  if (id >= 300 && id < 600) return 'rain'
  if (id >= 600 && id < 700) return 'snow'
  if (id >= 700 && id < 800) return 'fog'
  if (id === 800) return 'clear'
  if (id > 800) return 'cloudy'
}
