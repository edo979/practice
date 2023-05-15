import { StyleSheet, Text, View } from 'react-native'
import Button from './Button'
import { GlobalStyles } from '../../constants/style'

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={[styles.text]}>{message}</Text>
      <Button onPress={onConfirm}>Ok</Button>
    </View>
  )
}

export default ErrorOverlay
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})