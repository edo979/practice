import { Link, Outlet, json, useLoaderData } from '@remix-run/react'

const dummy_data = [
  { id: 1, title: 'First expense', amount: 15, date: 1707519600000 },
  { id: 2, title: 'Second expense', amount: 10, date: 1707951600000 },
  { id: 3, title: 'Third expense', amount: 25, date: 1708383600000 },
]

export const loader = async () => {
  return json(dummy_data)
}

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>()

  return (
    <>
      <div className="mt-4 row justify-content-center">
        <div className="col-8 d-flex flex-column justify-content-center align-items-center gap-4 flex-md-row">
          <h1 className="h4">Expenses:</h1>
          <div className="d-grid gap-3 col-12 d-sm-block col-sm-auto">
            <Link to="add" className="btn btn-light">
              🪙 Add expense
            </Link>
            <Link to="#" className="btn btn-light ms-sm-3">
              🔎 View details
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-2 row justify-content-center">
        <div className="col-8">
          <ol className="list-group list-group-numbered">
            {expenses.map((expense) => (
              <Link
                to={`${expense.id}`}
                key={expense.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{expense.title}</div>
                  <span>${expense.amount}</span>
                </div>
                <small>
                  <Link to="#" title="Delete" className="text-decoration-none">
                    ❌
                  </Link>
                </small>
              </Link>
            ))}
          </ol>
        </div>
      </div>

      <Outlet />
    </>
  )
}
