import { ActionFunctionArgs, redirect } from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useSearchParams,
} from '@remix-run/react'
import { useEffect, useRef } from 'react'
import FormInvalidInputMsg from '~/components/FormInvalidInputMsg'
import Modal from '~/components/Modal'
import {
  BalanceDetailsMutationT,
  BalanceDetailsT,
  updateBalance,
} from '~/data/firebase.server'
import { calculateAvailableBalance } from '~/data/utils'
import { validateBalanceDetailsInput } from '~/data/validator'

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = 'testuserid'
  const formData = await request.formData()
  const balanceMutationData = Object.fromEntries(
    formData
  ) as BalanceDetailsMutationT

  try {
    validateBalanceDetailsInput(balanceMutationData)
  } catch (error) {
    console.log(error)
    return error
  }

  await updateBalance(userId, {
    limit: parseFloat(balanceMutationData.limit!),
    total: parseFloat(balanceMutationData.total!),
  })

  return redirect('/expenses/details#balance')
}

export default function EditDetails() {
  const formErrors = useActionData<Record<string, string>>()

  const limitInputRef = useRef<HTMLInputElement>(null)
  const totalInputRef = useRef<HTMLInputElement>(null)
  const availableInputRef = useRef<HTMLInputElement>(null)

  const [searchParams] = useSearchParams()
  const field = searchParams.get('f') || 'overdraft-limit'

  const matches = useMatches()
  const { balance } = matches.find(
    (match) => match.pathname === '/expenses/details'
  )?.data as { balance: BalanceDetailsT }

  useEffect(() => {
    if (field === 'overdraft-limit') {
      limitInputRef.current?.focus()
    } else if (field === 'total-balance') {
      totalInputRef.current?.focus()
    } else if (field === 'available-balance') {
      availableInputRef.current?.focus()
    }
  }, [field])

  return (
    <Modal>
      <>
        <div className="modal-header">
          <h5 className="modal-title align-items-baseline">
            Menage Balance Details
          </h5>
          {formErrors && (
            <p className="my-0 mx-auto text-danger">Form has some errors!</p>
          )}
          <Link to="..#balance" className="btn-close" aria-label="Close" />
        </div>

        <div className="modal-body">
          <Form method="post" id="edit-details-form">
            <div className="mb-3">
              <label htmlFor="limit" className="form-label fw-bold">
                Overdraft limit
              </label>
              <input
                ref={limitInputRef}
                type="number"
                name="limit"
                id="limit"
                className="form-control"
                defaultValue={balance.limit}
                step="0.05"
                required
              />
              <FormInvalidInputMsg error={formErrors?.limit} />
            </div>
            <div className="mb-3">
              <label htmlFor="total" className="form-label fw-bold">
                Total Balance
              </label>
              <input
                ref={totalInputRef}
                type="number"
                name="total"
                id="total"
                className="form-control"
                defaultValue={balance.total}
                step="0.05"
                required
              />
              <FormInvalidInputMsg error={formErrors?.total} />
            </div>
            <div className="mb-3">
              <label htmlFor="available" className="form-label fw-bold">
                Available Balance
              </label>
              <input
                ref={availableInputRef}
                type="number"
                name="available"
                id="available"
                className="form-control"
                defaultValue={calculateAvailableBalance(balance)}
                step="0.05"
                disabled
              />
              <FormInvalidInputMsg error={formErrors?.available} />
            </div>
          </Form>
        </div>

        <div className="modal-footer">
          <button
            form="edit-details-form"
            type="submit"
            className="btn btn-primary"
          >
            👌Save
          </button>
        </div>
      </>
    </Modal>
  )
}
