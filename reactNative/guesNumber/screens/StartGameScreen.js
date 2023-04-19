import { useState } from 'react'
import { StyleSheet, View, TextInput, Alert } from 'react-native'

import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../constants/collors'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('')

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function confirmInputNumber() {
    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number must be number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }

    onPickNumber(chosenNumber)
  }

  function resetInputHandler() {
    setEnteredNumber('')
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess my number</Title>
      <Card>
        <InstructionText>Enter the number:</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputNumber}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  )
}
export default StartGameScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    gap: 32,
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flex: 1,
  },
})
