import { Pressable, StyleSheet, Text, View } from 'react-native'

const GoalItem = ({ onDelete, item }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#210644' }}
        onPress={() => {
          onDelete(item.id)
        }}
      >
        <Text style={styles.goalText}>{item.text}</Text>
      </Pressable>
    </View>
  )
}
export default GoalItem

const styles = StyleSheet.create({
  goalItem: {
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    marginBottom: 16,
  },

  goalText: {
    color: 'white',
    padding: 8,
  },
})
