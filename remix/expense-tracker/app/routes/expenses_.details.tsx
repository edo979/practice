import { Link, useLoaderData } from '@remix-run/react'
import ExpenseChart from '~/components/ExpenseChart'
import { getAllTransactions } from '~/data/firebase.server'

export const loader = async () => {
  const transactions = await getAllTransactions()
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

export default function ExpensesDetails() {
  const expenseData = useLoaderData<typeof loader>()

  return (
    <>
      <div className="row mt-3 border-bottom">
        <div className="col-auto my-auto">
          <Link to="/expenses" className="btn btn-sm btn-outline-secondary">
            👈 Back
          </Link>
        </div>

        <div className="col">
          <h1 className="text-center">Expenses Details</h1>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-xl-8 mx-auto">
          <ExpenseChart {...expenseData} />
        </div>
      </div>
    </>
  )
}
