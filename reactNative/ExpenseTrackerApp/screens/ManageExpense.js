import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconBtn from '../components/ui/IconBtn'
import { GlobalStyles } from '../constants/style'
import Button from '../components/ui/Button'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/MenageExpense.js/ExpenseForm'

const ManageExpense = ({ route, navigation }) => {
  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext)
  const editExpenseId = route.params?.expenseId
  const isEditing = !!editExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    deleteExpense(editExpenseId)
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler() {
    if (isEditing) {
      updateExpense(editExpenseId, {
        description: 'Test!!!!',
        amount: 29.99,
        date: new Date(),
      })
    } else {
      addExpense({ description: 'Test', amount: 99.99, date: new Date() })
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconBtn
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}
export default ManageExpense
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
