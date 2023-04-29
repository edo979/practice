import { StyleSheet, View } from 'react-native'
import Summary from './Summary'
import List from './List'
import { GlobalStyles } from '../../constants/style'

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <Summary periodName={expensesPeriod} expenses={expenses} />
      <List expenses={expenses} />
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
})
