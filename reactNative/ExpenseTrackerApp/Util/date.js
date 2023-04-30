export function getformatedDate(date) {
  return date.toISOString().slice(0, 10)
}

export function getDate7daysBeffore() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
}
