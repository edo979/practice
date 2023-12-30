import { Form, useActionData, useLoaderData } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { addProduct } from '../../db/products'

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await addProduct(data)
    console.log('redirect')
  } catch (error) {
    console.log(error.details)
  }
}

const ProductList = () => {
  const { products } = useLoaderData()
  const errors = useActionData()

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h1>Products</h1>
        </div>

        <div className="col text-end">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
          >
            Add Product
          </button>
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

      <div
        className="modal fade"
        id="addProductModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="addProductModalLabel">
                Add Product
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <Form method="post">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                  />
                </div>

                <div className="d-flex gap-1 gap-md-4">
                  <div className="mb-3 w-100">
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                    />
                  </div>

                  <div className="mb-3 w-100">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                  />
                </div>

                <div className="d-flex gap-1 gap-md-4">
                  <div className="mb-3 w-100">
                    <label htmlFor="in-stock" className="form-label">
                      In Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="in-stock"
                      name="inStock"
                    />
                  </div>

                  <div className="mb-3 w-100">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        $
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>

                <input type="submit" id="submit-form-btn" className="d-none" />
              </Form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <label
                className="btn btn-primary"
                htmlFor="submit-form-btn"
                tabIndex="0"
              >
                Save changes
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList
