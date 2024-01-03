import classNames from 'classnames'
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { addProduct } from '../../db/products'
import { uploadImg } from '../../db/storage'
import { FaCheck } from 'react-icons/fa'

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // remove image object because image is uploaded via storage
  delete data.image
  const image = formData.get('image')
  const errors = {}

  try {
    // Save to firestore
    const res = await addProduct(data)

    // // Save image to storage
    await uploadImg({ image, imageName: res.data.id })

    return redirect('/admin/productslist')
  } catch (error) {
    if (error.code.toLowerCase().includes('internal')) {
      errors.formError = error.message
      return errors
    }
    errors.fieldsError = error.details
    return errors
  }
}

const AddProduct = () => {
  const errors = useActionData()
  const navigation = useNavigation()

  return (
    <>
      {errors?.formError && (
        <div className="alert alert-danger" role="alert">
          ❌ {errors.formError}
        </div>
      )}

      {navigation.state === 'loading' ? (
        <div className="d-flex">
          <div
            className="mx-auto my-5 spinner-border text-primary fs-4"
            role="status"
            style={{ width: '5rem', height: '5rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
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
                  errors?.fieldsError?.category
                    ? 'category-field-error'
                    : undefined
                }
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
                  errors?.fieldsError?.inStock
                    ? 'in-stock-field-error'
                    : undefined
                }
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
            <Link to={'..'} className="btn btn-secondary">
              <b>X</b> Cancel
            </Link>
            <button className="btn btn-primary">
              {navigation.state === 'submitting' && (
                <div
                  className="me-2 spinner-border spinner-border-sm"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              <FaCheck /> Add Product
            </button>
          </div>
        </Form>
      )}
    </>
  )
}

export default AddProduct
