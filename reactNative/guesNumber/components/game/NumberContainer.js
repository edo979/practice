import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/collors'

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}
export default NumberContainer

const isSM = Dimensions.get('window').width < 380

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isSM ? 12 : 24,
    padding: isSM ? 12 : 24,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: Colors.accent500,
  },

  numberText: {
    color: Colors.accent500,
    fontSize: isSM ? 28 : 36,
    fontFamily: 'Open-Sans-bold',
  },
})
