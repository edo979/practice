import { Form } from 'react-router-dom'

const EditContact = () => {
  return (
    <Form className="mx-sm-2 my-sm-5 m-5">
      <div className="row mb-3">
        <label htmlFor="first" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            name="first"
            id="first"
            className="form-control"
            placeholder="First"
          />
        </div>

        <div className="col-sm-5 mt-3 mt-sm-0">
          <input
            type="text"
            name="second"
            id="second"
            className="form-control"
            placeholder="Second"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="twitter" className="col-sm-2 col-form-label">
          Twitter
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="form-control"
            placeholder="@jack"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="avatar" className="col-sm-2 col-form-label">
          Avatar URL
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            name="avatar"
            id="avatar"
            className="form-control"
            placeholder="http://example.com/avatar.jpg"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="notes" className="col-sm-2 col-form-label">
          Notes
        </label>
        <div className="col-sm-10">
          <textarea name="notes" id="notes" className="form-control" rows={5} />
        </div>
      </div>
    </Form>
  )
}

export default EditContact
