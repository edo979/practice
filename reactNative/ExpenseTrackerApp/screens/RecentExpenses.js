import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput.js/ExpensesOutput'
import { getDate7daysBeffore } from '../Util/date'
import { ExpensesContext } from '../store/expenses-context'

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext)

  const recentExpenses = expenses.filter(
    (expenses) => expenses.date > getDate7daysBeffore()
  )

  return (
    <ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} />
  )
}
export default RecentExpenses
const styles = StyleSheet.create({})
