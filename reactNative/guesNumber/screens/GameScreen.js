import { useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import GuessLogItem from '../components/game/GuessLogItem'

let minBoundary = 1
let maxBoundary = 100

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRound, setGuessRounds] = useState([initialGuess])
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRound.length)
    }
  }, [currentGuess, userNumber, onGameOver])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }

    const rndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(rndNum)
    setGuessRounds((prev) => [rndNum, ...prev])
  }

  const isSMheight = height < 450

  return (
    <View style={styles.screen}>
      <Title>Phone's Guess</Title>

      <View
        style={
          isSMheight && {
            flexDirection: 'row-reverse',
            gap: 16,
            alignItems: 'flex-start',
          }
        }
      >
        <View style={isSMheight ? { gap: 8 } : { gap: 32 }}>
          <NumberContainer>{currentGuess}</NumberContainer>

          <Card>
            <InstructionText style={styles.instructionText}>
              Higher or Lower:
            </InstructionText>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                  <Ionicons name="md-remove" size={24} color="white" />
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                  <Ionicons name="md-add" size={24} color="white" />
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>

        <ScrollView
          style={[styles.scrollContainer, isSMheight && { marginBottom: 40 }]}
        >
          {guessRound.map((roundGuess, i) => (
            <GuessLogItem
              key={roundGuess}
              roundNumber={guessRound.length - i}
              guess={roundGuess}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
export default GameScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 18,
  },
  scrollContainer: {
    marginTop: 8,
  },
})
