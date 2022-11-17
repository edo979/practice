import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { useState } from 'react'

export default function AddClient() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [clientId, setClientId] = useState('')
  const [status, setStatus] = useState('new')

  // const [addClient] = useMutation(ADD_CLIENT, {
  //   variables: { name, email, phone },
  //   update(cache, { data: { addClient } }) {
  //     const { clients } = cache.readQuery({ query: GET_CLIENTS })

  //     cache.writeQuery({
  //       query: GET_CLIENTS,
  //       data: { clients: [...clients, addClient] },
  //     })
  //   },
  // })

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields')
    }

    //addClient(name, email, phone)

    setName('')
    setDescription('')
    setStatus('new')
    setClientId('')
  }

  return (
    <>
      <>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProjectModal"
        >
          <div className="d-flex align-items-center">
            <FaList className="icon" />
            <div>New Project</div>
          </div>
        </button>

        <div
          className="modal fade"
          id="addProjectModal"
          aria-labelledby="addProjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">
                  New Project
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={() => setStatus(e.target.value)}
                    >
                      <option value="new">Not Started</option>
                      <option value="progress">In progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}
