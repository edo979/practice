import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlineButton from '../components/ui/OutlineButton'
import { Colors } from '../constants/colors'
import { useEffect, useState } from 'react'
import { fetchPlaceDetails } from '../util/database'

const PlaceDetails = ({ route, navigation }) => {
  const [placeDetails, setPlaceDetails] = useState()
  const { placeId } = route.params

  useEffect(() => {
    async function fetchPlaceFromDB() {
      const place = await fetchPlaceDetails(placeId)
      setPlaceDetails(place)
      navigation.setOptions({ title: place.title })
    }

    fetchPlaceFromDB()
  }, [placeId])

  function showOnMapHandler() {
    navigation.navigate('Map', {
      lat: placeDetails.location.lat,
      lng: placeDetails.location.lng,
    })
  }

  if (!placeDetails)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: Colors.primary50 }}>Loading Places Data...</Text>
      </View>
    )

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeDetails.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  )
}

export default PlaceDetails
const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
