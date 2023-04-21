import { StyleSheet, Text, View } from 'react-native'

const List = ({ items }) => {
  return items.map((item, i) => (
    <View key={i} style={styles.listItem}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  ))
}
export default List
const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: 'white',
  },
  itemText: {
    color: '#351401',
  },
})
