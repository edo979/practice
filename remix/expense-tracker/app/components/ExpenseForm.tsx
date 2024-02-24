import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { ExpenseLoaderT } from '~/routes/expenses.$id'

function ExpenseForm() {
  const expense = useLoaderData<ExpenseLoaderT | null>()
  const formErrors = useActionData<Record<string, string>>()

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title align-items-baseline">Menage Expense</h5>
        {formErrors && (
          <p className="my-0 mx-auto text-danger">Form has some errors!</p>
        )}
        <Link to=".." className="btn-close" aria-label="Close" />
      </div>

      <div className="modal-body">
        <Form method="post" id="add-expense-form">
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

          <div className="d-flex align-items-center gap-2">
            <label htmlFor="amount" className="form-label fw-bold mb-0">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-control w-50"
              defaultValue={expense?.amount || ''}
            />

            <label htmlFor="date" className="form-label fw-bold mb-0">
              Date:
            </label>
            <input className="form-control" type="date" name="date" id="date" />
          </div>
        </Form>
      </div>

      <div className="modal-footer">
        <button
          form="add-expense-form"
          type="submit"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </>
  )
}

export default ExpenseForm
