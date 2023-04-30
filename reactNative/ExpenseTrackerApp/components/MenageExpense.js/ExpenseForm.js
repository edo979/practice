import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'

const ExpenseForm = () => {
  function amountChangedHandler() {}

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.flexRow}>
        <Input
          label="Amount"
          style={styles.flex1}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler,
          }}
        />
        <Input
          label="Date"
          style={styles.flex1}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
        }}
      />
    </View>
  )
}
export default ExpenseForm
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  container: {
    marginTop: 80,
  },
  formTitle: {
    marginVertical: 24,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
})
