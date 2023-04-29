import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/style'
import { getformatedDate } from '../../Util/date'
import { useNavigation } from '@react-navigation/native'

const Item = ({ id, description, amount, date }) => {
  const navigation = useNavigation()
  function expensePressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    })
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getformatedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  )
}
export default Item
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  },
})
