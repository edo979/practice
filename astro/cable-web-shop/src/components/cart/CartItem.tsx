import type { CartItemT } from '../../store/cart'

const CartItem = ({ item }: { item: CartItemT }) => {
  return (
    <li>
      <a
        className="group block rounded-lg bg-base-100 hover:shadow"
        href={`/products/${item.id}`}
      >
        <h3 className="text-lg">
          <em>{item.quantity}</em> &times; {item.name}
        </h3>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="m-0 w-full h-32 object-cover"
        />
        <div className="flex">
          <small className="hidden group-hover:inline-block">
            Click to update!
          </small>
          <p className="ml-auto">
            Price: <strong>{item.price} $</strong>
          </p>
        </div>
      </a>
    </li>
  )
}

export default CartItem
