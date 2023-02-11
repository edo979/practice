export const toLocalTime = (dateString: string) => {
  const date = new Date(dateString)
  const dateParts = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
  const formatedDateParts = dateParts.map((part) =>
    part < 9 ? `0${part}` : part.toString()
  )
  const [month, day, year, hour, minutes, seconds] = formatedDateParts
  return `${day}.${month}.${year} / ${hour}:${minutes}:${seconds}`
}
