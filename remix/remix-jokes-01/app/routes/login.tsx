export default function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form action="post">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
