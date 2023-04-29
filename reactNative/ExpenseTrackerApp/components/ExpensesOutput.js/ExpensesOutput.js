import { StyleSheet, View } from 'react-native'
import Summary from './Summary'
import List from './List'
import { GlobalStyles } from '../../constants/style'

const EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoe',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-01'),
  },
  {
    id: 'e3',
    description: 'Bannanas',
    amount: 9.99,
    date: new Date('2021-12-02'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 19.99,
    date: new Date('2022-02-17'),
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 19.54,
    date: new Date('2022-02-22'),
  },
  {
    id: 'e6',
    description: 'A pair of shoe',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-01'),
  },
  {
    id: 'e8',
    description: 'Bannanas',
    amount: 9.99,
    date: new Date('2021-12-02'),
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 19.99,
    date: new Date('2022-02-17'),
  },
  {
    id: 'e10',
    description: 'A book',
    amount: 19.54,
    date: new Date('2022-02-22'),
  },
]

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <Summary periodName={expensesPeriod} expenses={EXPENSES} />
      <List expenses={EXPENSES} />
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
