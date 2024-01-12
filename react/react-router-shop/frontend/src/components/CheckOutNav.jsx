const CheckOutNav = ({ orderId }) => {
  return (
    <div className="row my-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-custom overflow-hidden text-center bg-body-tertiary border rounded-3">
          <li className="breadcrumb-item">
            {orderId ? (
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href={`/me/orders/new/${orderId}/edit`}
              >
                Checkout Form
              </a>
            ) : (
              <span className="fw-semibold">Checkout Form</span>
            )}
          </li>
          <li className="breadcrumb-item active">
            {orderId ? (
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href={`/me/orders/new/${orderId}/checkout`}
              >
                Checkout
              </a>
            ) : (
              'Checkout'
            )}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Finish
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default CheckOutNav
