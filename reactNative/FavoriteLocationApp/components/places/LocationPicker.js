import { Alert, StyleSheet, View, Image, Text } from 'react-native'
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import { Colors } from '../../constants/colors'
import OutlineButton from '../ui/OutlineButton'
import { useEffect, useState } from 'react'
import { getAddress, getMapPreview } from '../../util/location'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'

const LocationPicker = ({ onLocationPick }) => {
  const [pickedLocation, setPickedLocation] = useState()
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()
  const navigaton = useNavigation()
  const { params } = useRoute()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && params) {
      setPickedLocation({ lat: params.pickedLat, lng: params.pickedLng })
    }
  }, [isFocused, params])

  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permission',
        'You need to grant location permission.'
      )
      return false
    }

    return true
  }

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
        onLocationPick({ ...pickedLocation, address })
      }
    }

    handleLocation()
  }, [pickedLocation])

  async function getLocationHandler() {
    const hasPermission = await verifyPermission()
    if (!hasPermission) return

    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {
    navigaton.navigate('Map')
  }

  let locationPreview = <Text>No location picked yet.</Text>
  if (pickedLocation)
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    )

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  )
}

export default LocationPicker
const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
