const CheckOutNav = () => {
  return (
    <div className="row my-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-custom overflow-hidden text-center bg-body-tertiary border rounded-3">
          <li className="breadcrumb-item">
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              href="#"
            >
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              href="#"
            >
              Library
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default CheckOutNav
