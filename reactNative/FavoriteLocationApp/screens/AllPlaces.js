import { StyleSheet } from 'react-native'
import PlacesList from '../components/places/PlacesList'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curr) => [...curr, route.params.place])
    }
  }, [isFocused, route])

  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces
const styles = StyleSheet.create({})
