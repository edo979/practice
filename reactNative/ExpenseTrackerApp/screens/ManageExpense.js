import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ManageExpense = ({ route, navigation }) => {
  const editExpenseId = route.params?.expenseId
  const isEditing = !!editExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  return (
    <View>
      <Text>ManageExpense</Text>
    </View>
  )
}
export default ManageExpense
const styles = StyleSheet.create({})
