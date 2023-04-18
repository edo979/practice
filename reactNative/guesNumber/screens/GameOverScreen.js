import { Image, StyleSheet, Text, View } from 'react-native'
import Title from '../components/ui/Title'
import Colors from '../constants/collors'
import PrimaryButton from '../components/ui/PrimaryButton'

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  return (
    <View>
      <Title>Game Over</Title>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/success.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.higlight}>{roundsNumber}</Text>{' '}
          rounds to gues number{' '}
          <Text style={styles.higlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
      </View>
    </View>
  )
}
export default GameOverScreen
const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    width: 300,
    height: 300,
    margin: 36,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'Open-Sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  higlight: {
    fontFamily: 'Open-Sans-bold',
    color: Colors.primary500,
  },
})
