import type { CartItemT } from '../../stores/cart'
import CartItem from './CartItem'

const CartList = ({ cart }: { cart: CartItemT[] }) => {
  return (
    <ul>
      {cart.map((item) => (
        <CartItem item={item} key={item.productId} />
      ))}
    </ul>
  )
}
export default CartList
