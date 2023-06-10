import type { CartItemT } from '../../stores/cart'

const CartItem = ({ item }: { item: CartItemT }) => {
  return (
    <li>
      {item.name} x {item.quantity}
    </li>
  )
}
export default CartItem
