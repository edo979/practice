import { useLoaderData } from '@remix-run/react'
import { ExpenseLoaderT } from '~/routes/expenses.$id'

function ExpenseForm() {
  const expense = useLoaderData<ExpenseLoaderT | null>()

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold">
          Expense title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          defaultValue={expense?.title || ''}
        />
      </div>

      <div className="d-flex align-items-center gap-4">
        <label htmlFor="amount" className="form-label fw-bold mb-0">
          Amount:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="form-control"
          defaultValue={expense?.amount || ''}
        />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm
