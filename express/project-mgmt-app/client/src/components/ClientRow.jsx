import { FaTrash } from 'react-icons/fa'
import { Form } from 'react-router-dom'

export default function ClientRow({ client }) {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <Form method="post">
          <input type="hidden" name="_clientId" value={client.id} />
          <button className="btn btn-danger btn-sm" type="submit">
            <FaTrash />
          </button>
        </Form>
      </td>
    </tr>
  )
}
