import { useState } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((current) => [
      ...current,
      { text: enteredGoalText, id: Math.random().toString() },
    ])

    endAddGoalHandler()
  }

  function deleteGoalHandler(id) {
    setCourseGoals((current) => current.filter((item) => item.id !== id))
  }

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {modalIsVisible && (
          <GoalInput
            onAddGoal={addGoalHandler}
            isVisible={modalIsVisible}
            onCancel={endAddGoalHandler}
          />
        )}

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem item={itemData.item} onDelete={deleteGoalHandler} />
              )
            }}
          />
        </View>

        <Button
          title="Add new Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
    marginBottom: 32,
  },
})
