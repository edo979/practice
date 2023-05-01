import { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ExpensesContext } from '../store/expenses-context'
import { storeExpense, deleteExpenseDB, updateExpenseDB } from '../Util/http'
import IconBtn from '../components/ui/IconBtn'
import { GlobalStyles } from '../constants/style'
import ExpenseForm from '../components/MenageExpense.js/ExpenseForm'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import ErrorOverlay from '../components/ui/ErrorOverlay'

const ManageExpense = ({ route, navigation }) => {
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
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

  async function deleteExpenseHandler() {
    setIsSubmitting(true)

    try {
      await deleteExpenseDB(selectedExpenseId)
      deleteExpense(selectedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense!')
      setIsSubmitting(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)

    try {
      if (isEditing) {
        updateExpense(selectedExpenseId, expenseData)
        await updateExpenseDB(selectedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save data')
      setIsSubmitting(false)
    }
  }

  if (error && !isSubmitting)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />

  if (isSubmitting) return <LoadingOverlay />

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
