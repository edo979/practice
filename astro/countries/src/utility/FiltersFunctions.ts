export const filterCountriesByName = (data: any, nameToFind: string) => {
  return data.filter((country: any) => {
    const common = country.name.common
    const official = country.name.official

    let nativeNames: string[] = []
    if (country.name.nativeName) {
      nativeNames = Object.values(country.name.nativeName).flatMap(
        (value: any) => Object.values(value)
      )
    }

    const translationNames = Object.values(country.translations).flatMap(
      (value: any) => Object.values(value)
    )

    const capital = country.capital ?? []

    const names = Array.from(
      new Set([
        common,
        official,
        ...nativeNames,
        ...translationNames,
        ...capital,
      ])
    )

    return names.some((name) =>
      name.toLowerCase().startsWith(nameToFind.toLowerCase())
    )
  })
}

export const filterCountriesByRegion = (data: any, region: string) => {
  if (region === 'All') return data
  return data.filter((country: any) => country.region === region)
}
