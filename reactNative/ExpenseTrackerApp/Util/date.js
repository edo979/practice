export function getformatedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function getDate7daysBeffore() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
}
