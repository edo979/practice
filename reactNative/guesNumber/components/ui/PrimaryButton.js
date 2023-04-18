import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/collors'

const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
        style={styles.innerContainer}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}
export default PrimaryButton

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },

  innerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary500,
    elevation: 4,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})
