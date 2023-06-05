import type { CartItemT } from '../../stores/cart'

const CartList = ({ cart }: { cart: CartItemT[] }) => {
  return (
    <ul>
      {cart.map((item) => (
        <li key={item.productId}>
          {item.productId} x {item.quantity}
        </li>
      ))}
    </ul>
  )
}
export default CartList
