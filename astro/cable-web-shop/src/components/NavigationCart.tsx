import { useStore } from '@nanostores/react'
import { $cart, $cartTotalPrice, $totalCartItems } from '../store/cart'

const NavigationCart = () => {
  const cart = useStore($cart)
  const cartTotalPrice = useStore($cartTotalPrice)
  const totalCartItems = useStore($totalCartItems)

  console.log(cart)

  return (
    <div>
      <p>
        {totalCartItems}-{cartTotalPrice}
      </p>
      <ul>
        {cart.map((item) => (
          <li style={{ display: 'inline-block' }}>
            <small>{item.name}</small>
            <img src={item.imageUrl} alt={item.name} height={32} />
            <small>
              {item.quantity && <span>{item.quantity} * </span>}
              {item.price} $
              <strong>total: {item.quantity * item.price}$</strong>
            </small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationCart
