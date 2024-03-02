import { Form, Link, useMatches, useSearchParams } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import Modal from '~/components/Modal'
import { calculateTotalBalance } from '~/data/utils'

export default function EditDetails() {
  const limitInputRef = useRef<HTMLInputElement>(null)
  const totalInputRef = useRef<HTMLInputElement>(null)
  const availableInputRef = useRef<HTMLInputElement>(null)

  const [searchParams] = useSearchParams()
  const field = searchParams.get('f') || 'overdraft-limit'

  const matches = useMatches()
  const { balance } = matches.find(
    (match) => match.pathname === '/expenses/details'
  )?.data as { balance: { limit: number; current: number } }

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
          {/* {formErrors && (
          <p className="my-0 mx-auto text-danger">Form has some errors!</p>
        )} */}
          <Link to="..#balance" className="btn-close" aria-label="Close" />
        </div>

        <div className="modal-body">
          <Form method="POST" id="edit-details-form">
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
              {/* <FormInvalidInputMsg error={formErrors?.title} /> */}
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
                defaultValue={calculateTotalBalance(balance)}
                step="0.05"
                required
              />
              {/* <FormInvalidInputMsg error={formErrors?.title} /> */}
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
                defaultValue={balance.current}
                step="0.05"
                required
              />
              {/* <FormInvalidInputMsg error={formErrors?.title} /> */}
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
