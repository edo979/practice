import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
} from '@remix-run/react'
import classNames from 'classnames'
import { ExpenseT } from '~/data/firebase.server'
import FormInvalidInputMsg from './FormInvalidInputMsg'

function ExpenseForm() {
  const params = useParams()

  const formErrors = useActionData<Record<string, string>>()

  const matches = useMatches()
  const expenses = matches.find((match) => match.id === 'routes/expenses')
    ?.data as ExpenseT[]
  const expense = expenses.find((item) => item.id === params.id)

  if (params.id && !expense) throw new Error('That Expense does not exist')

  const today = new Date().toISOString().slice(0, 10)

  function isValidInput(fieldName: string) {
    const haveErrors = formErrors && Object.keys(formErrors).length > 0
    const isValid = haveErrors && formErrors[fieldName] === undefined
    return isValid
  }

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
        <Form method={expense ? 'PATCH' : 'POST'} id="add-expense-form">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Expense title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className={classNames('form-control', {
                'is-invalid': formErrors?.title,
                'is-valid': isValidInput('title'),
              })}
              defaultValue={expense?.title || ''}
              // min="3"
              // max="30"
              // required
            />
            <FormInvalidInputMsg error={formErrors?.title} />
          </div>

          <div className="d-flex align-items-top gap-2">
            <div>
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="amount" className="form-label fw-bold mb-0">
                  Amount:
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className={classNames('form-control w-100', {
                    'is-invalid': formErrors?.amount,
                    'is-valid': isValidInput('amount'),
                  })}
                  defaultValue={expense?.amount || ''}
                  // min="0"
                  step="0.01"
                />
              </div>
              <FormInvalidInputMsg error={formErrors?.amount} />
            </div>

            <div className="w-100">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="date" className="form-label fw-bold mb-0">
                  Date:
                </label>
                <input
                  className={classNames('form-control', {
                    'is-invalid': formErrors?.date,
                    'is-valid': isValidInput('date'),
                  })}
                  type="date"
                  name="date"
                  id="date"
                  // max={today}
                  defaultValue={expense?.date || today}
                  title="jah jah"
                />
              </div>
              <FormInvalidInputMsg error={formErrors?.date} />
            </div>
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
