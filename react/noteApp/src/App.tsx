import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Container className="my-4">
      <Outlet />
    </Container>
  )
}

export default App
