import type { CartItemT } from '../../store/cart'

const CartItem = ({ item }: { item: CartItemT }) => {
  return (
    <li>
      <p>jah</p>
      <h3>{item.name}</h3>
      <img src={item.imageUrl} alt={item.name} />
      <p>{item.price}</p>
    </li>
  )
}

export default CartItem
