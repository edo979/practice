import { StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput.js/ExpensesOutput'
import { getDate7daysBeffore } from '../Util/date'
import { ExpensesContext } from '../store/expenses-context'
import { fetchExpenses } from '../Util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import ErrorOverlay from '../components/ui/ErrorOverlay'

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)

      try {
        setExpenses(await fetchExpenses())
      } catch (error) {
        setError('Could not fetch expenses!')
      }

      setIsFetching(false)
    }

    getExpenses()
  }, [])

  const recentExpenses = expenses.filter(
    (expenses) => expenses.date > getDate7daysBeffore()
  )

  if (error && !isFetching)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />

  if (isFetching) return <LoadingOverlay />

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallBackText="No recent expenses"
    />
  )
}
export default RecentExpenses
const styles = StyleSheet.create({})
