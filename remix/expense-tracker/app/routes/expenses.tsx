import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import classNames from 'classnames'
import ErrorContainer from '~/components/ErrorContainer'
import { getAllExpenses } from '~/data/firebase.server'

export const loader = async () => {
  const expenses = await getAllExpenses()
  return expenses
}

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>()
  const deleteExpenseFetcher = useFetcher()

  function deleteExpenseHandler(id: string) {
    if (!confirm('Are you sure you want to delete!')) return

    deleteExpenseFetcher.submit(null, {
      method: 'DELETE',
      action: `${id}`,
    })
  }

  return (
    <>
      <div className="mt-4 row justify-content-center">
        <h1 className="h4 text-center">In and Out list:</h1>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center gap-4 flex-md-row">
          <div className="d-grid gap-3 col-12 d-sm-flex col-sm-auto">
            <Link to="add" className="btn btn-outline-danger">
              ➖ Add expense
            </Link>
            <Link to="add?type=in" className="btn btn-outline-success">
              ➕ Add income
            </Link>
            <Link to="details" className="btn btn-outline-primary">
              🔎 View details
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-2 row justify-content-center">
        <div className="col-8">
          <ol className="list-group list-group-numbered">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <Link
                  to={`${expense.id}`}
                  key={expense.id}
                  className={classNames(
                    'list-group-item list-group-item-action d-flex justify-content-between align-items-start',
                    { 'bg-success-subtle': expense.income }
                  )}
                >
                  <div
                    className={classNames('ms-2 me-auto', {
                      'text-success-emphasis fw-bold': expense.income,
                    })}
                  >
                    <div className="">{expense.title}</div>
                    <span className="">${expense.amount}</span>
                  </div>

                  <button
                    title="Delete"
                    className="btn btn-outline-secondary btn-sm px-2 py-0"
                    onClick={(e) => {
                      e.preventDefault()
                      deleteExpenseHandler(expense.id)
                    }}
                  >
                    <b>X</b>
                  </button>
                </Link>
              ))
            ) : (
              <p>There was no expenses!</p>
            )}
          </ol>
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
