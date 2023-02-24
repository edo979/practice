const LSname = 'rest_countries-app'

export async function getData() {
  const dataFromLS = localStorage.getItem(LSname)

  if (!dataFromLS) {
    const data = await fetchData()

    if (!data) return null

    saveToLS(data)
    return data
  }

  const dataLS = JSON.parse(dataFromLS) as { lastVisit: number; data: any }
  // if data 14 days old don't fetch
  if (new Date().getTime() < dataLS.lastVisit + 1000 * 60 * 60 * 24 * 14)
    return dataLS.data

  const data = await fetchData()

  if (!data) return null

  saveToLS(data)
  return data
}

async function fetchData() {
  try {
    console.log('fetching')
    const res = await fetch('https://restcountries.com/v3.1/all')

    if (res.ok) {
      return await res.json()
    }

    return null
  } catch (error) {
    return null
  }
}

export function saveToLS(data: any) {
  localStorage.setItem(
    LSname,
    JSON.stringify({ lastVisit: new Date().getTime(), data })
  )
}
