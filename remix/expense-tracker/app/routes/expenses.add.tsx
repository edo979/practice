import ExpenseForm from '~/components/ExpenseForm'
import Modal from '~/components/Modal'

export const action = async () => {
  return null
}

export default function ExpenseAdd() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  )
}
