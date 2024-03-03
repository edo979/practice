import { BalanceDetailsMutationT, ExpenseRawT } from './expense.server'

function isValidTitle(value: string | undefined) {
  return (
    value &&
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.trim().length <= 30
  )
}

function isValidAmount(value: string | undefined) {
  if (!value || typeof value !== 'string') return false
  const amount = parseFloat(value)
  return !isNaN(amount) && amount > 0
}

function isValidDate(value: string | undefined) {
  return (
    typeof value === 'string' &&
    new Date(value).getTime() < new Date().getTime()
  )
}

export function validateExpenseInput(input: ExpenseRawT) {
  let validationErrors: Record<string, string> = {}

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid expense title. Must be at most 30 characters long.'
  }
  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      'Invalid expense amount. Must be a number greater than zero.'
  }
  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid expense date. Must be a date before today.'
  }

  if (Object.keys(validationErrors).length > 0) throw validationErrors
}

export function validateBalanceDetailsInput(input: BalanceDetailsMutationT) {
  let validationErrors: Record<string, string> = {}

  if (!isValidAmount(input.limit))
    validationErrors.limit =
      'Invalid limit input. Must be a number greater than zero!'

  if (!isValidAmount(input.total))
    validationErrors.total =
      'Invalid total input. Must be a number greater than zero!'

  if (Object.keys(validationErrors).length > 0) throw validationErrors
}
