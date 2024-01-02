import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import classNames from 'classnames'
import { editProduct } from '../../db/products'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'

export async function action({ request, params }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  data.id = params.id
  const errors = {}

  try {
    await editProduct(data)
    return redirect(`/admin/productlist`)
  } catch (error) {
    if (error.code.toLowerCase().includes('internal')) {
      errors.formError = error.message
      return errors
    }
    errors.fieldsError = error.details
    return errors
  }
}

const EditProduct = () => {
  const { product } = useLoaderData()
  const errors = useActionData()
  const navigation = useNavigation()

  return (
    <Form method="post" encType="multipart/form-data">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': errors?.fieldsError?.name,
          })}
          aria-describedby={
            errors?.fieldsError?.name ? 'name-field-error' : undefined
          }
          defaultValue={product && product.name}
          id="name"
          name="name"
        />
        {errors?.fieldsError?.name && (
          <p id="name-field-error" className="invalid-feedback">
            {errors.fieldsError.name}
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
              'is-invalid': errors?.fieldsError?.brand,
            })}
            aria-describedby={
              errors?.fieldsError?.brand ? 'brand-field-error' : undefined
            }
            defaultValue={product && product.brand}
            id="brand"
            name="brand"
          />
          {errors?.fieldsError?.brand && (
            <p id="brand-field-error" className="invalid-feedback">
              {errors.fieldsError.brand}
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
              'is-invalid': errors?.fieldsError?.category,
            })}
            aria-describedby={
              errors?.fieldsError?.category ? 'category-field-error' : undefined
            }
            defaultValue={product && product.category}
            id="category"
            name="category"
          />
          {errors?.fieldsError?.category && (
            <p id="category-field-error" className="invalid-feedback">
              {errors.fieldsError.category}
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
            'is-invalid': errors?.fieldsError?.description,
          })}
          aria-describedby={
            errors?.fieldsError?.description
              ? 'description-field-error'
              : undefined
          }
          defaultValue={product && product.description}
          id="description"
          name="description"
          rows={3}
        />
        {errors?.fieldsError?.description && (
          <p id="description-field-error" className="invalid-feedback">
            {errors.fieldsError.description}
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
              'is-invalid': errors?.fieldsError?.inStock,
            })}
            aria-describedby={
              errors?.fieldsError?.inStock ? 'in-stock-field-error' : undefined
            }
            defaultValue={product && product.inStock}
            id="in-stock"
            name="inStock"
          />
          {errors?.fieldsError?.inStock && (
            <p id="in-stock-field-error" className="invalid-feedback">
              {errors.fieldsError.inStock}
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
                'is-invalid': errors?.fieldsError?.price,
              })}
              aria-describedby={
                errors?.fieldsError?.price ? 'price-field-error' : undefined
              }
              defaultValue={product && product.price}
              id="price"
              name="price"
              placeholder="9.99"
              step="0.01"
            />
            {errors?.fieldsError?.price && (
              <p id="price-field-error" className="invalid-feedback">
                {errors.fieldsError.price}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <input type="file" name="image" id="image" />
      </div>

      <div className="d-flex justify-content-end gap-3">
        <Link to={`/admin/productlist`} className="btn btn-secondary">
          <FaArrowLeft /> Cancel
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' && (
            <div
              className="me-2 spinner-border spinner-border-sm"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <FaCheck /> Update Product
        </button>
      </div>
    </Form>
  )
}

export default EditProduct
