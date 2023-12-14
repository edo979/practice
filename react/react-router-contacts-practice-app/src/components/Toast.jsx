import classNames from 'classnames'

const Toast = ({ message }) => {
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        className={classNames('toast text-bg-danger fs-5', {
          'fade show': message !== undefined,
        })}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">System message:</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message ? message : ''}</div>
      </div>
    </div>
  )
}

export default Toast
