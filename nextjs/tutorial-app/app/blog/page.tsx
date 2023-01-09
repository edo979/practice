import Counter from './components/counter'

export default async function BlogRoute() {
  await new Promise((res) => setTimeout(res, 1000))

  return (
    <div>
      <h2>Blog Route</h2>

      <Counter />
    </div>
  )
}
