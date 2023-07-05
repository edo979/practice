import { useEffect, useState } from 'react'
import type { ProductT } from '../firebase/utility/firestore'
import { $cart, addToCart } from '../store/cart'
import { useStore } from '@nanostores/react'

type ProductPropsT = {
  product: ProductT
}

const Product = ({ product }: ProductPropsT) => {
  const cart = useStore($cart)
  const [quantity, setQuantity] = useState(1)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    const cartItem = cart.find((item) => item.id === product.id)
    if (cartItem) {
      setQuantity(cartItem.quantity)
      setCartQuantity(cartItem.quantity)
      setIsInCart(true)
    } else {
      setQuantity(1)
      setCartQuantity(0)
      setIsInCart(false)
    }
  }, [cart])

  function quantityHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let quantity = parseInt(e.target.value)
    if (!quantity || quantity < 0) quantity = 0
    setQuantity(quantity)
  }

  return (
    <div>
      <a href="/">Back</a>
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.price}$</p>

      {isInCart && <p>You have {cartQuantity} item in cart!</p>}
      <input
        type="number"
        value={quantity}
        min="0"
        onChange={quantityHandler}
      />
      <button onClick={() => addToCart({ ...product, quantity })}>
        {isInCart ? 'Update cart' : 'Add to cart'}
      </button>
    </div>
  )
}

export default Product
