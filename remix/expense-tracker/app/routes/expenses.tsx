import { LoaderFunctionArgs } from '@remix-run/node'
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import classNames from 'classnames'
import { requireAuthCookie } from '~/auth/auth.server'
import ErrorContainer from '~/components/ErrorContainer'
import { getAllTransactions } from '~/data/expense.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request)
  const transactions = await getAllTransactions(userId)

  return transactions
}

export default function ExpensesLayout() {
  const transactions = useLoaderData<typeof loader>()
  const deleteExpenseFetcher = useFetcher()

  function deleteExpenseHandler(id: string) {
    if (!confirm('Are you sure you want to delete!')) return

    deleteExpenseFetcher.submit(null, {
      method: 'DELETE',
      action: `${id}`,
    })
  }

  console.log()

  return (
    <>
      <div className="mt-4 row justify-content-center">
        <h1 className="h4 text-center">In and Out list:</h1>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center gap-4 flex-md-row">
          <div className="d-grid gap-3 col-12 d-sm-flex col-sm-auto mt-4">
            <Link to="add" className="btn btn-outline-secondary">
              ➖ Expense
            </Link>
            <Link to="add?type=in" className="btn btn-outline-secondary">
              ➕ Income
            </Link>
            <Link to="details" className="btn btn-outline-secondary">
              🔎 Details
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-2 row justify-content-center">
        <div className="col-8">
          {transactions.length > 0 ? (
            <ol className="list-group list-group-numbered shadow mt-1">
              {transactions.map((entry) => (
                <Link
                  to={`${entry.id}`}
                  key={entry.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-start p-3"
                >
                  <div
                    className={classNames('ms-2 me-auto', {
                      'text-success-emphasis fw-bold': entry.income,
                    })}
                  >
                    <div>{entry.title}</div>
                    <span
                      className={classNames(
                        'badge shadow-sm d-flex align-items-center mt-1 p-1 pe-2 border rounded-pill',
                        {
                          'text-light-emphasis bg-light-subtle border-light-subtle':
                            !entry.income,
                          'text-success-emphasis bg-success-subtle border-success-subtle':
                            entry.income,
                        }
                      )}
                      style={
                        {
                          '--bs-badge-font-size': '0.825rem',
                        } as React.CSSProperties
                      }
                    >
                      {new Date(entry.date).toLocaleDateString('en-Us', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                      <span className="vr mx-2"></span>${entry.amount}
                    </span>
                  </div>

                  <button
                    title="Delete"
                    className="btn btn-outline-secondary btn-sm px-2 py-0"
                    onClick={(e) => {
                      e.preventDefault()
                      deleteExpenseHandler(entry.id)
                    }}
                  >
                    <b>X</b>
                  </button>
                </Link>
              ))}
            </ol>
          ) : (
            <div className="alert alert-primary mt-4" role="alert">
              There was no transactions!
            </div>
          )}
        </div>
      </div>

      <Outlet />
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorContainer
        title={error.data}
        message={`${error.status} ${error.statusText}`}
        redirectTo="/expenses"
      />
    )
  } else if (error instanceof Error) {
    return <ErrorContainer title={error.message} redirectTo="/expenses" />
  } else {
    return <ErrorContainer title="Unknown Error!" redirectTo="/expenses" />
  }
}
