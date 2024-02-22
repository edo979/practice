import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'
import { dummy_data } from './expenses'

export const loader = () => {
  return dummy_data[0]
}

export type ExpenseLoaderT = typeof loader

export default function Expense() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
