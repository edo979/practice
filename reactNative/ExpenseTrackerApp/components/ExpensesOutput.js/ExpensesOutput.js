import { StyleSheet, View, Text } from 'react-native'
import Summary from './Summary'
import List from './List'
import { GlobalStyles } from '../../constants/style'

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }) => {
  let content = <Text style={styles.fallBackText}>{fallBackText}</Text>

  if (expenses.length > 0) {
    content = <List expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <Summary periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  )
}
export default ExpensesOutput
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallBackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 36,
  },
})
