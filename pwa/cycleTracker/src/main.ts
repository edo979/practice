const newPeriodFormEl = document.getElementsByTagName('form')[0]
const startDateInputEl = <HTMLInputElement>document.getElementById('start-data')
const endDateInputEl = <HTMLInputElement>document.getElementById('end-date')

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
  return true
}

function storeNewPeriod(startDate: string, endDate: string) {}

function renderPastPeriods() {}
