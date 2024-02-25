import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import ErrorContainer from '~/components/ErrorContainer'
import { getAllExpenses } from '~/data/firebase.server'

export const loader = async () => {
  const expenses = await getAllExpenses()
  // console.log(expenses)
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
        <div className="col-8 d-flex flex-column justify-content-center align-items-center gap-4 flex-md-row">
          <h1 className="h4">Expenses:</h1>
          <div className="d-grid gap-3 col-12 d-sm-block col-sm-auto">
            <Link to="add" className="btn btn-light">
              🪙 Add expense
            </Link>
            <Link to=".." className="btn btn-light ms-sm-3">
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
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{expense.title}</div>
                    <span>${expense.amount}</span>
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
