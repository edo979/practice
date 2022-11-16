import Header from './components/Header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Clients from './components/Clients'
import AddClient from './components/AddClient'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              return incoming
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClient />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
