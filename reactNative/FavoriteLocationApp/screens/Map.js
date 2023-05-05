import { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import IconButton from '../components/ui/IconButton'

const Map = ({ navigation, route }) => {
  const initialLocation = { lat: route.params.lat, lng: route.params.lng }
  const [selectedLocation, setSelectedLocation] = useState(() =>
    route.params ? initialLocation : null
  )

  const region = {
    latitude: selectedLocation.lat || 37.78825,
    longitude: selectedLocation.lng || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude
    setSelectedLocation({ lat, lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No Location Picked', 'You have to pick a location.')
      return
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    // return if showing map of place
    if (route.params) return

    // show icon for save place
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    })
  }, [savePickedLocationHandler])

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  )
}

export default Map
const styles = StyleSheet.create({
  map: { flex: 1 },
})
