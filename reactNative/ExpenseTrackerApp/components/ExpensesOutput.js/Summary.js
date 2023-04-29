import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/style'

const Summary = ({ periodName, expenses }) => {
  const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}
export default Summary
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
})
