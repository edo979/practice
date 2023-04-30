import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constants/style'

const Input = ({ label, textInputConfig, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig.multiline && styles.inputMultiline,
        ]}
        {...textInputConfig}
      />
    </View>
  )
}

export default Input
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
})
