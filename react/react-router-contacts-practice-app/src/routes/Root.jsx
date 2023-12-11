import UserNav from '../components/UserNav'

const Root = () => {
  return (
    <div className="container">
      <div className="row">
        <div
          className="pt-4 bg-primary-subtle text-body-emphasis"
          style={{ minHeight: '100vh' }}
        >
          <UserNav />

          <hr className="my-4" />
        </div>
      </div>
    </div>
  )
}

export default Root
