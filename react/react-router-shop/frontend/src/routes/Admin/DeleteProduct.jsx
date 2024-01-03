import { redirect } from 'react-router-dom'
import { deleteProduct } from '../../db/products'

export async function action({ params }) {
  try {
    await deleteProduct(params.id)
    return redirect('/admin/productslist')
  } catch (error) {
    throw new Error(error.message)
  }
}
