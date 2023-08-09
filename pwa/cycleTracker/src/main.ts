const newPeriodFormEl = document.getElementsByTagName('form')[0]
const startDateInputEl = <HTMLInputElement>document.getElementById('start-date')
const endDateInputEl = <HTMLInputElement>document.getElementById('end-date')
const STORAGE_KEY = 'period-tracker-app'

type PeriodT = {
  startDate: string
  endDate: string
}

newPeriodFormEl.addEventListener('submit', (e) => {
  e.preventDefault()

  const startDate = startDateInputEl.value,
    endDate = endDateInputEl.value

  if (checkDatesInvalid(startDate, endDate)) return

  storeNewPeriod(startDate, endDate)
  renderPastPeriods()

  newPeriodFormEl.reset()
})

function checkDatesInvalid(startDate: string, endDate: string) {
  if (!startDate || !endDate || startDate > endDate) {
    newPeriodFormEl.reset()
    return true
  }

  return false
}

function storeNewPeriod(startDate: string, endDate: string) {
  const periods = getAllStoredPeriods()
  periods.push({ startDate, endDate })
  periods.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate))

  console.log(periods)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods))
}

function getAllStoredPeriods() {
  const data = window.localStorage.getItem(STORAGE_KEY)
  const periods: PeriodT[] = data ? JSON.parse(data) : []
  return periods
}

function renderPastPeriods() {}
