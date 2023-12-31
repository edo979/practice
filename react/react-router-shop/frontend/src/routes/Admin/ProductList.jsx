import { Link, useLoaderData } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'

const ProductList = () => {
  const { products } = useLoaderData()

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h1>Products</h1>
        </div>

        <div className="col text-end">
          <Link to={'./add'} className="btn btn-primary">
            Add Product
          </Link>
        </div>
      </div>

      <table className="table table-primary table-striped table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}$</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <FaEdit />{' '}
                <span className="ms-2">
                  <FaTrash />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProductList
