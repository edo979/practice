import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput.js/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext)

  return <ExpensesOutput expensesPeriod="Total" expenses={expenses} />
}
export default AllExpenses
const styles = StyleSheet.create({})
