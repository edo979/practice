import { Outlet } from '@remix-run/react'

export default function ExpensesLayout() {
  return (
    <>
      <h1>Expense Layout</h1>
      <Outlet />
    </>
  )
}
