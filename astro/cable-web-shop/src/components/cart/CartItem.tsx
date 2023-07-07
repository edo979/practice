const CartItem = () => {
  return (
    <li>
      <h3>{product.name}</h3>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.price}</p>
    </li>
  )
}

export default CartItem
