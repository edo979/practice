import { Link, useLoaderData } from '@remix-run/react'
import DiffChart from '~/components/DiffChart'
import ExpenseChart from '~/components/ExpenseChart'
import { getAllTransactions } from '~/data/firebase.server'

export const loader = async () => {
  const userId = 'testuserid'
  const transactions = await getAllTransactions(userId)
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
  const monthDiffs = expenseData.incomes.map(
    (value, i) => value - expenseData.expenses[i]
  )

  return (
    <main>
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
        <div className="col">
          <ExpenseChart {...expenseData} />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <DiffChart labels={expenseData.labels} data={monthDiffs} />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h2>Expense data:</h2>
          <table className="table table-striped table-bordered mt-3 fs-5">
            <thead>
              <tr className="text-center">
                <th>Income</th>
                <th>Expense</th>
                <th>Saving</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <th colSpan={3}>Averages:</th>
              </tr>
              <tr>
                <td>
                  {expenseData.incomes.reduce((acc, value) => acc + value, 0) /
                    expenseData.incomes.length}
                </td>
                <td>
                  {expenseData.expenses.reduce((acc, value) => acc + value, 0) /
                    expenseData.expenses.length}
                </td>
                <td>
                  {monthDiffs.reduce((acc, value) => acc + value, 0) /
                    monthDiffs.length}
                </td>
              </tr>
              <tr>
                <th colSpan={3}>Max:</th>
              </tr>
              {/* MAX */}
              <tr>
                <td>{Math.max(...expenseData.incomes)}</td>
                <td>{Math.max(...expenseData.expenses)}</td>
                <td>{Math.max(...monthDiffs)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h2>Balance:</h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-3 mt-2 mb-5 text-center">
        <div className="col">
          <div className="card h-100 mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Overdraft limit</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title pricing-card-title h1">$0</h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  Maximum amount of money you can borrow from your bank when you
                  have spent all of your own money.
                </li>
              </ul>
            </div>
            <div className="card-footer px-4">
              <button
                type="button"
                className="w-100 btn btn-lg btn-outline-dark"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Total Balance</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title pricing-card-title h1">$0</h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  This shows everything, both your money and the overdraft
                  limit.
                </li>
                <li>Including overdraft.</li>
              </ul>
            </div>
            <div className="card-footer px-4">
              <button
                type="button"
                className="w-100 btn btn-lg btn-outline-dark"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Available Balance</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title pricing-card-title h1">$0</h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  This represents your money without considering the overdraft.
                </li>
              </ul>
            </div>
            <div className="card-footer px-4">
              <button
                type="button"
                className="w-100 btn btn-lg btn-outline-dark"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
