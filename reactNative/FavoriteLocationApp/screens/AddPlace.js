import { StyleSheet, Text, View } from 'react-native'
import PlaceForm from '../components/places/PlaceForm'

const AddPlace = ({ navigation }) => {
  function createPlaceHandler(place) {
    navigation.navigate('AllPlaces', { place })
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
const styles = StyleSheet.create({})
