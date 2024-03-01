import { Form, Link, useSearchParams } from '@remix-run/react'
import Modal from '~/components/Modal'

export default function EditDetails() {
  const [searchParams] = useSearchParams()
  const modeType = searchParams.get('t') || 'undefined'
  const formTitle =
    modeType === 'overdraft-limit'
      ? 'Overdraft Limit'
      : modeType === 'total-balance'
      ? 'Total Balance'
      : 'Available Balance'

  return (
    <Modal>
      <>
        <div className="modal-header">
          <h5 className="modal-title align-items-baseline">
            Menage {formTitle}
          </h5>
          {/* {formErrors && (
          <p className="my-0 mx-auto text-danger">Form has some errors!</p>
        )} */}
          <Link to=".." className="btn-close" aria-label="Close" />
        </div>

        <div className="modal-body">
          <Form method="POST" id="edit-details-form">
            <div className="mb-3">
              <label htmlFor={modeType} className="form-label fw-bold">
                {formTitle}
              </label>
              <input
                type="number"
                name="title"
                id="title"
                className="form-control"
                // defaultValue={expense?.title || ''}
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
