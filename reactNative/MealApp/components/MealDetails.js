import { StyleSheet, Text, View } from 'react-native'
const MealDetails = ({
  duration,
  complexity,
  affordability,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.details, style]}>
      <Text style={textStyle}>{duration} min</Text>
      <Text style={textStyle}>{complexity.toUpperCase()}</Text>
      <Text style={textStyle}>{affordability.toUpperCase()}</Text>
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
