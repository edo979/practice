export default function Footer() {
  return (
    <footer className="flex flex-col items-center p-12 rounded bg-gray-900 text-gray-400">
      <p className="text-lg font-semibold">Simple Blog</p>
      <img src="/images/logo.png" alt="logo" className="w-16 my-4" />
      <p>
        <span className="text-lg">📲</span>{' '}
        <span className="text-sm">2023</span>
      </p>
    </footer>
  )
}
