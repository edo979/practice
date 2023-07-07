import type { CartItemT } from '../../store/cart'

const CartItem = ({ item }: { item: CartItemT }) => {
  return (
    <li>
      <a href={`/products/${item.id}`} className="block w-full p-0 m-0">
        <div className="w-full p-2 rounded-lg bg-base-100 hover:ring-2 hover:ring-accent-focus hover:shadow">
          <h3 className="text-lg">{item.name}</h3>
          <img src={item.imageUrl} alt={item.name} />
          <p className="text-right">
            Price: <strong>{item.price} $</strong>
          </p>
        </div>
      </a>
    </li>
  )
}

export default CartItem
