import { redirect } from 'react-router-dom'
import { deleteProduct } from '../../db/products'

export async function action({ request, params }) {
  console.log(params.id)
  try {
    await deleteProduct(params.id)
    return redirect('/admin/productlist')
  } catch (error) {
    throw new Error(error.message)
  }
}
