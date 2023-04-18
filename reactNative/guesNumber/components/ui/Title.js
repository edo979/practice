import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/collors'
const Title = ({ children }) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
}
export default Title
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Open-Sans-bold',
    fontSize: 24,
    color: Colors.accent500,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 8,
  },
})
