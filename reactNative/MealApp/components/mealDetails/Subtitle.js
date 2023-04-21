import { StyleSheet, Text, View } from 'react-native'
const Subtitle = ({ children }) => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={[styles.textWhite, styles.subTitle]}>{children}</Text>
    </View>
  )
}
export default Subtitle
const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleContainer: {
    marginHorizontal: 24,
    marginVertical: 6,
    padding: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
})
