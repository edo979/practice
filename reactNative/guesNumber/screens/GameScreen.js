import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = ({ userNumber }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  return (
    <View style={styles.screen}>
      <Title>Opponet's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higer or Lover</Text>
        {/* + - */}
      </View>
      <View>{/* Logs */}</View>
    </View>
  )
}
export default GameScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 16,
    padding: 32,
  },
})
