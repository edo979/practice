import { StyleSheet, Text, View } from 'react-native'
import PlaceForm from '../components/places/PlaceForm'
import { insertPlace } from '../util/database'

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place) {
    await insertPlace(place)
    navigation.navigate('AllPlaces')
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
const styles = StyleSheet.create({})
