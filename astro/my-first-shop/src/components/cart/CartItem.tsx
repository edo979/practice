import type { CartItemT } from '../../stores/cart'

const CartItem = ({ item }: { item: CartItemT }) => {
  return (
    <li className="bg-base-300 rounded-lg">
      <img
        className="w-full p-0  object-cover object-center"
        src={item.imageUrl}
        alt={item.name}
      />
      <p className="p-2 flex flex-row justify-between gap-2">
        <span className="text-lg">{item.name}</span>
        <span className="flex-shrink-0 font-bold">X {item.quantity}</span>
      </p>
    </li>
  )
}
export default CartItem
