import { Link, Outlet, json, useLoaderData } from '@remix-run/react'
import { db } from '~/data/firebaseInit.server'

export const dummy_data = [
  { id: 1, title: 'First expense', amount: 15, date: 1707519600000 },
  { id: 2, title: 'Second expense', amount: 10, date: 1707951600000 },
  { id: 3, title: 'Third expense', amount: 25, date: 1708383600000 },
]

export type Expense = {
  id: string
  title: string
  amount: number
  date: number
}

export const loader = async () => {
  try {
    const expensesCollRef = db.collection('expenses')
    const snpashot = await expensesCollRef.get()
    const expenses: Expense[] = snpashot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return json(expenses)
  } catch (error) {
    console.log(error)
    return null
  }

  //return json(dummy_data)
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
            <Link to=".." className="btn btn-light ms-sm-3">
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

                <button
                  title="Delete"
                  className="btn btn-outline-danger btn-sm px-1 py-0"
                  onClick={(e) => e.preventDefault()}
                >
                  <b>X</b>
                </button>
              </Link>
            ))}
          </ol>
        </div>
      </div>

      <Outlet />
    </>
  )
}
