import { Link, useLoaderData } from '@remix-run/react'
import ExpenseChart from '~/components/ExpenseChart'
import { getAllExpenses } from '~/data/firebase.server'

export const loader = async () => {
  const expenses = await getAllExpenses()
  const labels: string[] = []
  const data: number[] = []
  const expenseMap = new Map<string, number>()

  expenses.forEach((expense) => {
    const monthName = new Date(expense.date).toLocaleDateString('en-Us', {
      month: 'short',
    })

    if (expenseMap.has(monthName)) {
      let monthSum = expenseMap.get(monthName)
      if (monthSum === undefined) monthSum = 0
      expenseMap.set(monthName, monthSum + expense.amount)
    } else {
      expenseMap.set(monthName, expense.amount)
    }
  })

  expenseMap.forEach((value, key) => {
    labels.push(key)
    data.push(value)
  })

  return { labels, data }
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
