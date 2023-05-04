import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../ui/Button'
import { Place } from '../../models/place'

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [pickedLocation, setPickedLocation] = useState()
  const [selectedImage, setSelectedImage] = useState()

  function changeTitleHandler(enterdText) {
    setEnteredTitle(enterdText)
  }

  function takeImageHandler(imgUri) {
    setSelectedImage(imgUri)
  }

  function pickLocationHandler(location) {
    setPickedLocation(location)
  }

  function savePlaceHandler() {
    onCreatePlace(new Place(enteredTitle, selectedImage, pickedLocation))
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onLocationPick={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm
const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: 'bold', marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
})
