import { StyleSheet, Text, View } from 'react-native'
const MealDetails = ({ duration, complexity, affordability }) => {
  return (
    <View style={styles.details}>
      <Text>{duration} min</Text>
      <Text>{complexity.toUpperCase()}</Text>
      <Text>{affordability.toUpperCase()}</Text>
    </View>
  )
}
export default MealDetails
const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 8,
  },
})
