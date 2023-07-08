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
    <div className="max-w-md mt-16 mx-auto space-y-8">
      <h1 className="text-2xl">{product.name}</h1>
      <p className="text-lg">{product.desc}</p>
      <img src={product.imageUrl} alt={product.name} className="w-72 mx-auto" />
      <p className="text-right text-lg">
        <span>Price: </span>
        <strong>{product.price}$</strong>
      </p>

      {isInCart && <p>You have {cartQuantity} item in cart!</p>}
      <div className="flex justify-end gap-4">
        <input
          type="number"
          value={quantity}
          min="0"
          onChange={quantityHandler}
          className="py-1.5 px-3 rounded w-20 border border-base-300"
        />
        <button
          className="btn btn-accent"
          onClick={() => addToCart({ ...product, quantity })}
        >
          {isInCart ? 'Update cart' : 'Add to cart'}
        </button>
      </div>

      <button onClick={() => history.back()} className="my-8 btn btn-primary">
        ⬅️ Back
      </button>
    </div>
  )
}

export default Product
