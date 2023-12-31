const Spinner = () => {
  return (
    <div className="d-flex">
      <div
        className="mx-auto my-5 spinner-border text-primary fs-4"
        role="status"
        style={{ width: '5rem', height: '5rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
