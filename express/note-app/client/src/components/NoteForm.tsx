import classNames from 'classnames'
import { Form, Link } from 'react-router-dom'
import { Tag } from '../routes/Home'
import { ActionData } from '../routes/NewNote'
import CreatableReactSelect from 'react-select/creatable'
import Select from 'react-select'

type NoteFormProps = {
  errors: ActionData
  tags: Tag[]
  navigationState: string
  isEdit: boolean
}

export default function NoteForm({
  errors,
  tags,
  navigationState,
  isEdit,
}: NoteFormProps) {
  return (
    <Form method="post">
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="col">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={classNames('form-control', {
              'is-invalid': errors?.fieldErrors?.title ? true : false,
            })}
            name="title"
            id="title"
            aria-describedby="title-validation"
            defaultValue={errors?.fields?.title}
          />
          <div className="invalid-feedback" id="title-validation">
            {errors?.fieldErrors?.title}
          </div>
        </div>

        <div className="col">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>

          {isEdit ? (
            <Select
              name="tags"
              options={tags.map((tag) => ({
                label: tag.label,
                value: tag._id,
              }))}
              defaultValue={errors?.fields?.tags.map((tagId) => ({
                label: tags.find((tag) => tag._id === tagId)?.label,
                value: tagId,
              }))}
              aria-describedby="tags-validation"
              className={classNames({
                'is-invalid': errors?.fieldErrors?.tags,
              })}
              isMulti
            />
          ) : (
            <CreatableReactSelect
              options={tags.map((tag) => ({
                label: tag.label,
                value: tag._id,
              }))}
              isMulti
              name="tags"
              defaultValue={errors?.fields?.tags.map((tag) => ({
                value: tag,
              }))}
              aria-describedby="tags-validation"
              className={classNames({
                'is-invalid': errors?.fieldErrors?.tags,
              })}
            />
          )}

          <div className="invalid-feedback" id="tags-validation">
            {errors?.fieldErrors?.tags}
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="body">
            Body
          </label>
          <textarea
            rows={15}
            className={classNames('form-control', {
              'is-invalid': errors?.fieldErrors?.body,
            })}
            name="body"
            aria-describedby="body-validation"
            defaultValue={errors?.fields?.body}
          />
          <div className="invalid-feedback" id="body-validation">
            {errors?.fieldErrors?.body}
          </div>
        </div>
      </div>

      <div className="row mt-2">
        {errors?.formError && (
          <div className="col">
            <i className="text-danger">{errors.formError}</i>
          </div>
        )}

        <div className="col-auto ms-auto">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={navigationState !== 'idle'}
          >
            {navigationState !== 'idle' && (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            )}
            Save
          </button>
          <Link to="..">
            <button
              className="btn btn-secondary ms-2"
              disabled={navigationState !== 'idle'}
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </Form>
  )
}
