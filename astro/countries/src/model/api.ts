const LSname = 'rest_countries-app'

export async function getData() {
  const dataFromLS = localStorage.getItem(LSname)

  if (!dataFromLS) {
    const data = await fetchData()

    if (!data) return null

    saveToLS(data)
    return data
  }

  return JSON.parse(dataFromLS)
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
  localStorage.setItem(LSname, JSON.stringify(data))
}
