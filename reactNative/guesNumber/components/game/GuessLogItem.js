import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/collors'
const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Phone's Guess: {guess}</Text>
    </View>
  )
}
export default GuessLogItem
const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 12,
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: Colors.accent500,
    elevation: 4,
  },
  itemText: {
    fontFamily: 'Open-Sans',
  },
})
