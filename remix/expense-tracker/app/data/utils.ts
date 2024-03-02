import { formatNumber } from 'chart.js/helpers'
import { BalanceDetailsT, ExpenseT } from './firebase.server'

export const calculateDataFromTransaction = (transactions: ExpenseT[]) => {
  const labels: string[] = []
  const incomes: number[] = []
  const expenses: number[] = []
  const transactionsMap = new Map<
    string,
    { incomes: number; expenses: number }
  >()

  transactions.forEach((entry) => {
    const monthName = new Date(entry.date).toLocaleDateString('en-Us', {
      month: 'short',
    })
    const isIncome = entry.income === true

    if (transactionsMap.has(monthName)) {
      const monthTransactions = transactionsMap.get(monthName)

      if (isIncome) {
        let monthIncomeSum = monthTransactions?.incomes
        if (monthIncomeSum === undefined) monthIncomeSum = 0
        transactionsMap.set(monthName, {
          expenses: monthTransactions?.expenses || 0,
          incomes: monthIncomeSum + entry.amount,
        })
      } else {
        let monthExpenseSum = monthTransactions?.expenses
        if (monthExpenseSum === undefined) monthExpenseSum = 0
        transactionsMap.set(monthName, {
          expenses: monthExpenseSum + entry.amount,
          incomes: monthTransactions?.incomes || 0,
        })
      }
    } else {
      transactionsMap.set(
        monthName,
        isIncome
          ? { incomes: entry.amount, expenses: 0 }
          : { incomes: 0, expenses: entry.amount }
      )
    }
  })

  transactionsMap.forEach((value, key) => {
    labels.push(key)
    incomes.push(value.incomes)
    expenses.push(value.expenses)
  })

  return { labels, incomes, expenses }
}

export const calculateAvailableBalance = ({
  limit,
  total,
}: BalanceDetailsT) => {
  return total - limit
}

export const showFormattedNumber = (number: number) => {
  return number.toLocaleString('hr-Hr', {
    minimumFractionDigits: 2,
  })
}
