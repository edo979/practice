import { Pressable, StyleSheet, Text, View } from 'react-native'
const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#58052f' }}
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
    backgroundColor: '#72063c',
    elevation: 4,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})
