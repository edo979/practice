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
            {/* Modal header and footer is in the children node! */}
            {children}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default Modal
