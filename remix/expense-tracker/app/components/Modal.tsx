import { Link } from '@remix-run/react'
import { PropsWithChildren } from 'react'

function Modal({ children }: PropsWithChildren) {
  return (
    <>
      <div
        className="modal fade show"
        tabIndex={-1}
        role="dialog"
        style={{ display: 'block' }}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Menage Expense</h5>
              <Link to=".." className="btn-close" aria-label="Close" />
            </div>

            <div className="modal-body">{children}</div>

            <div className="modal-footer">
              {/* <Link to=".." className="btn btn-secondary">
                Close
              </Link>
              <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default Modal
