import { useLoaderData } from 'react-router-dom'
import { addCartItem, getCartItems } from '../db/cart'
import { getUser } from '../db/auth'
import ErrorPage from '../components/ErrorPage'
import ErrorContent from '../components/ErrorContent'

export async function action({ request }) {
  const productId = (await request.formData()).get('productId')
  const data = { productId, quantity: 3 }

  try {
    await addCartItem(data)
  } catch (error) {
    console.log(error)
  }

  return null
}

export async function loader() {
  // this loader is used in navigation for shoving total chart item
  // because of that i handled error in this way
  try {
    // Just wait until auth initialize
    const user = await getUser()

    const res = await getCartItems()
    const items = res.data
    console.log(items)

    return { items }
  } catch (error) {
    return { items: [], error }
  }
}

const Cart = () => {
  const { items, error } = useLoaderData()

  return (
    <>
      {error ? (
        <ErrorContent error={error} />
      ) : (
        <div className="px-4">
          <div className="row">
            <h1>Cart</h1>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
                {items.map((item, i) => (
                  <div className="col">
                    <div
                      className="card h-100 position-relative"
                      key={item.id + i}
                    >
                      <img
                        className="card-img-top"
                        src={item.image}
                        alt={item.name}
                        style={{
                          maxHeight: '100px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                      <div className="card-body">
                        <h2 className="card-title fs-5">{item.name}</h2>
                        <p className="card-text">
                          <i>$</i>
                          {item.price}
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-body-secondary">
                          quantity: {item.quantity}
                        </small>
                      </div>
                      <button
                        className="btn btn-sm btn-danger shadow border-1 border-light position-absolute top-0 end-0"
                        title="Remove from cart"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-4">cart list</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
