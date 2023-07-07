import { useStore } from '@nanostores/react'
import CartItem from './CartItem'
import { $cart, $cartTotalPrice } from '../../store/cart'

const CartList = () => {
  const cart = useStore($cart)
  const cartTotalPrice = useStore($cartTotalPrice)

  return (
    <>
      <h2 className="text-lg font-bold text-center border-info border-b">
        Your Cart 🛒
      </h2>
      <p className="ml-auto underline">
        <strong>Total:</strong>{' '}
        <span className="text-lg font-bold">{cartTotalPrice}$</span>
      </p>
      <ul className="mt-3 flex-1 space-y-3 overflow-y-auto">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
    </>
  )
}

export default CartList
