import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import classNames from 'classnames'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { addProduct } from '../../db/products'

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = {}

  try {
    await addProduct(data)
    return null
  } catch (error) {
    if (error.code.toLowerCase().includes('internal')) {
      errors.formError = error.message
      return errors
    }
    errors.fieldsError = error.details
    return errors
  }
}

const ProductList = () => {
  const { products } = useLoaderData()
  const errors = useActionData()
  const navigation = useNavigation()

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
              <AddProductForm errors={errors?.fieldsError} />
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
                htmlFor={
                  navigation.state === 'idle' ? 'submit-form-btn' : undefined
                }
                tabIndex="0"
              >
                {navigation.state === 'submitting' && (
                  <>
                    <div
                      className="me-2 spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </>
                )}
                Save changes
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function AddProductForm({ errors }) {
  return (
    <>
      {errors?.formError && (
        <div className="alert alert-danger" role="alert">
          ❌ {errors.formError}
        </div>
      )}

      <Form method="post">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={classNames('form-control', {
              'is-invalid': errors?.name,
            })}
            aria-describedby={errors?.name ? 'name-field-error' : undefined}
            id="name"
            name="name"
          />
          {errors?.name && (
            <p id="name-field-error" className="invalid-feedback">
              {errors.name}
            </p>
          )}
        </div>

        <div className="d-flex gap-1 gap-md-4">
          <div className="mb-3 w-100">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className={classNames('form-control', {
                'is-invalid': errors?.brand,
              })}
              aria-describedby={errors?.brand ? 'brand-field-error' : undefined}
              id="brand"
              name="brand"
            />
            {errors?.brand && (
              <p id="brand-field-error" className="invalid-feedback">
                {errors.brand}
              </p>
            )}
          </div>

          <div className="mb-3 w-100">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className={classNames('form-control', {
                'is-invalid': errors?.category,
              })}
              aria-describedby={
                errors?.category ? 'category-field-error' : undefined
              }
              id="category"
              name="category"
            />
            {errors?.category && (
              <p id="category-field-error" className="invalid-feedback">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className={classNames('form-control', {
              'is-invalid': errors?.description,
            })}
            aria-describedby={
              errors?.description ? 'description-field-error' : undefined
            }
            id="description"
            name="description"
            rows={3}
          />
          {errors?.description && (
            <p id="description-field-error" className="invalid-feedback">
              {errors.description}
            </p>
          )}
        </div>

        <div className="d-flex gap-1 gap-md-4">
          <div className="mb-3 w-100">
            <label htmlFor="in-stock" className="form-label">
              In Stock
            </label>
            <input
              type="number"
              className={classNames('form-control', {
                'is-invalid': errors?.inStock,
              })}
              aria-describedby={
                errors?.inStock ? 'in-stock-field-error' : undefined
              }
              id="in-stock"
              name="inStock"
            />
            {errors?.inStock && (
              <p id="in-stock-field-error" className="invalid-feedback">
                {errors.inStock}
              </p>
            )}
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
                className={classNames('form-control', {
                  'is-invalid': errors?.price,
                })}
                aria-describedby={
                  errors?.price ? 'price-field-error' : undefined
                }
                id="price"
                name="price"
              />
              {errors?.price && (
                <p id="price-field-error" className="invalid-feedback">
                  {errors.price}
                </p>
              )}
            </div>
          </div>
        </div>

        <input type="submit" id="submit-form-btn" className="d-none" />
      </Form>
    </>
  )
}

export default ProductList
