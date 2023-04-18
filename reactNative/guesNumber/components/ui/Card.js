import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/collors'

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: '100%',
    marginTop: 36,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
})
