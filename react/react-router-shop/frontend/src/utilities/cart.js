export const totalItemsPrice = (price, qty) =>
  (parseFloat(price) * parseInt(qty)).toFixed(2)

export const totalCartPrice = (items) =>
  items.reduce((acc, curr) => curr.quantity * curr.price + acc, 0).toFixed(2)
