import { Link } from 'react-router-dom'

const Pagination = ({ perPage, total }) => {
  const numOfPages = Math.floor(total / perPage)
  let content = []

  for (let index = 1; index <= numOfPages; index++) {
    content.push(
      <Link to={`?page=${index}`} className="mx-2" key={index}>
        {index}
      </Link>
    )
  }

  return <div>{content}</div>
}

Pagination.defaultProps = {
  perPage: 2,
}

export default Pagination
