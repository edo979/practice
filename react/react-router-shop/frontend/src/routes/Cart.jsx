import { useLoaderData } from 'react-router-dom'
import { addCartItem, getCartItems } from '../db/cart'
import { getUser } from '../db/auth'

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
  // Just wait until auth initialize
  const user = await getUser()

  try {
    const res = await getCartItems()
    const items = res.data
    console.log(items)

    return { items }
  } catch (error) {
    console.log(error)
    return { items: [] }
  }
}

const Cart = () => {
  const { items } = useLoaderData()

  return (
    <div className="px-4">
      <div className="row">
        <h1>Cart</h1>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            {items.map((item, i) => (
              <div className="card" key={i}>
                <img className="card-img-top" src="" alt="" />
                <div className="card-body">
                  <h2 className="card-title fs-5">Title</h2>
                  <p className="card-text">card text</p>
                  <p className="card-text">
                    <small className="text-body-secondary">price</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-4">cart list</div>
      </div>
    </div>
  )
}

export default Cart
