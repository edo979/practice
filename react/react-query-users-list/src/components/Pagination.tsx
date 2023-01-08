import { useQuery, useQueryClient } from 'react-query'
import { getUsers } from '../api'

export default function Pagination() {
  const queryClient = useQueryClient()
  const usersQuery = useQuery('users', getUsers)

  function handleClick() {}

  return (
    <section className="mt-4 flex justify-center gap-2">
      <button className="btn btn-primary">First</button>
      <button className="btn btn-primary">Prev</button>
      <span>1 of 5</span>
      <button className="btn btn-primary">Next</button>
      <button className="btn btn-primary">Last</button>
    </section>
  )
}
