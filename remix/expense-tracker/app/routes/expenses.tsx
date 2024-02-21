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
      <div className="row">
        <div className="col">
          <h1>Expense Layout</h1>
        </div>
      </div>

      <Outlet />

      <div className="row justify-content-center ">
        <div className="col-8">
          <ol className="list-group list-group-numbered">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{expense.title}</div>
                  <small className="me-2">
                    <Link to="#" title="Edit" className="text-decoration-none">
                      ✏️
                    </Link>
                  </small>
                  <span>${expense.amount}</span>
                </div>
                <small>
                  <Link to="#" title="Delete" className="text-decoration-none">
                    ❌
                  </Link>
                </small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
