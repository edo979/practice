import { LoaderFunctionArgs } from '@remix-run/node'
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import { requireAuthCookie } from '~/auth/auth.server'
import DiffChart from '~/components/DiffChart'
import ErrorContainer from '~/components/ErrorContainer'
import ExpenseChart from '~/components/ExpenseChart'
import {
  ExpenseT,
  getAllTransactions,
  getBalance,
} from '~/data/firebase.server'
import {
  calculateDataFromTransaction,
  calculateAvailableBalance,
  showFormattedNumber,
} from '~/data/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request)
  const transactions = await getAllTransactions(userId)
  const balance = await getBalance(userId)

  return { transactions, balance }
}

export default function ExpensesDetails() {
  const { transactions, balance } = useLoaderData<typeof loader>()
  const expenseData = calculateDataFromTransaction(
    transactions as unknown as ExpenseT[]
  )
  const monthDiffs = expenseData.incomes.map(
    (value, i) => value - expenseData.expenses[i]
  )

  return (
    <main>
      <div className="row mt-3 border-bottom">
        <div className="col-auto my-auto">
          <Link to="/expenses" className="btn btn-sm btn-outline-dark">
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

      <div className="row mt-5" id="balance">
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
              <h4 className="card-title pricing-card-title h1">
                ${showFormattedNumber(balance.limit)}
              </h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  Maximum amount of money you can borrow from your bank when you
                  have spent all of your own money.
                </li>
              </ul>
            </div>
            <div className="card-footer px-4">
              <Link
                to="edit?f=overdraft-limit#balance"
                type="button"
                className="w-100 btn btn-lg btn-outline-dark"
              >
                ✏️ Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Total Balance</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title pricing-card-title h1">
                ${showFormattedNumber(balance.total)}
              </h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  This shows sum, both your money and the overdraft limit.
                </li>
                <li>Manually sync your balance here!</li>
              </ul>
            </div>
            <div className="card-footer px-4">
              <Link
                to="edit?f=total-balance#balance"
                type="button"
                className="w-100 btn btn-lg btn-outline-dark"
              >
                ✏️ Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100 mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Available Balance</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title pricing-card-title h1">
                ${showFormattedNumber(calculateAvailableBalance(balance))}
              </h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  This represents your money without considering the overdraft.
                </li>
              </ul>
            </div>
            <div className="card-footer px-4">
              <small>
                Available balance should be calculate from limit and total.
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5 pb-3 border-bottom">
        <div className="col-auto my-auto">
          <Link to="/expenses" className="btn btn-sm btn-outline-dark">
            👈 Back
          </Link>
        </div>
      </div>

      <Outlet />
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorContainer
        title={error.data}
        message={`${error.status} ${error.statusText}`}
        redirectTo="/expenses/details#balance"
      />
    )
  } else if (error instanceof Error) {
    return (
      <ErrorContainer
        title={error.message}
        redirectTo="/expenses/details#balance"
      />
    )
  } else {
    return (
      <ErrorContainer
        title="Unknown Error!"
        redirectTo="/expenses/details#balance"
      />
    )
  }
}
