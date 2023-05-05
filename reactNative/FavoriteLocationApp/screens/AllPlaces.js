import { StyleSheet } from 'react-native'
import PlacesList from '../components/places/PlacesList'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { fetchPlaces } from '../util/database'

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    async function fetchPlacesFromDB() {
      setLoadedPlaces(await fetchPlaces())
    }

    if (isFocused) fetchPlacesFromDB()
  }, [isFocused])

  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces
const styles = StyleSheet.create({})
