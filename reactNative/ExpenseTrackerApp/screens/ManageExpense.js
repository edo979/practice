import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import IconBtn from '../components/ui/IconBtn'
import { GlobalStyles } from '../constants/style'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/MenageExpense.js/ExpenseForm'

const ManageExpense = ({ route, navigation }) => {
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext)
  const selectedExpenseId = route.params?.expenseId
  const isEditing = !!selectedExpenseId
  const selectedExpense = expenses.find(
    (expenses) => expenses.id === selectedExpenseId
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    deleteExpense(selectedExpenseId)
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      updateExpense(selectedExpenseId, expenseData)
    } else {
      addExpense(expenseData)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitBtnLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
