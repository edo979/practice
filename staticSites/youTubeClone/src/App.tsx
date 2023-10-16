import PageHeader from './layouts/PageHeader'

export default function App() {
  return (
    <div className="max-h-screen flex flex-col [&>*]:border [&>*]:border-lime-400 ">
      <PageHeader />
      <div>2</div>
    </div>
  )
}
