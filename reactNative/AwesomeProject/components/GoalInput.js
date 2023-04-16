import { useState } from 'react'
import { StyleSheet, TextInput, View, Button, Modal, Image } from 'react-native'

const GoalInput = ({ onAddGoal, isVisible, onCancel }) => {
  const [enteredGoalText, setEnteredGoalText] = useState()

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText)
  }

  function addGoalHandler() {
    onAddGoal(enteredGoalText)
    setEnteredGoalText('')
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/goal.png')}
        />
        <TextInput
          placeholder="Your course goal!"
          style={styles.textInput}
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#5e0acc" />
          </View>
        </View>
      </View>
    </Modal>
  )
}
export default GoalInput

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },

  textInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: 'center',
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: '45%',
  },
})
