import classNames from 'classnames'

export default function NewJokes() {
  return (
    <form method="post">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        className={classNames('form-control')}
        id="name"
        placeholder="Joke name..."
        aria-describedby="invalid-name-feedback"
      />
      <div className="invalid-feedback" id="invalid-name-feedback">
        Please valid joke name.
      </div>

      <label htmlFor="joke" className="form-label">
        Name
      </label>
      <textarea
        rows={6}
        className={classNames('form-control')}
        id="joke"
        placeholder="New joke..."
        aria-describedby="invalid-joke-feedback"
      />
      <div className="invalid-feedback" id="invalid-joke-feedback">
        Please valid joke name.
      </div>

      <button className="btn btn-secondary w-100 mt-3 px-5">Save</button>
    </form>
  )
}
