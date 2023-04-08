export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve, rejected) =>
    setTimeout(() => {
      try {
        resolve({ data: amount })
      } catch (error) {
        rejected()
      }
    }, 500)
  )
}
