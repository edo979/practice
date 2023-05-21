import {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {getLocationPermission} from '../services/locationServices';
import {DarkTheme} from '../constants/style';

const PickLocation = () => {
  const {updateNewPlace, newPlace} = useFavoritePlacesContext();

  useEffect(() => {
    if (newPlace?.location) return;

    async function getLocation() {
      try {
        const location = await getLocationPermission();

        if (location) updateNewPlace({location});
      } catch (err) {
        Alert.alert('Upozorenje', 'Došlo je do greške, pokušajte ponovo.');
      }
    }

    getLocation();
  }, [newPlace]);

  function onMapPress(e: MapPressEvent) {
    const {latitude: lat, longitude: lng} = e.nativeEvent.coordinate;
    updateNewPlace({location: {lat, lng}});
  }

  if (!newPlace?.location)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: DarkTheme.util.fsXL,
            color: DarkTheme.colors.border,
          }}>
          Određivanje lokacije
        </Text>
      </View>
    );

  return (
    <MapView
      provider={'google'}
      showsMyLocationButton={true}
      mapType="standard"
      initialRegion={{
        latitude: newPlace.location.lat || 43.6683,
        longitude: newPlace.location.lng || 18.9751,
        latitudeDelta: 0.05,
        longitudeDelta: 0.01,
      }}
      minZoomLevel={5}
      style={{flex: 1, height: '100%', width: '100%'}}
      onPress={onMapPress}>
      <Marker
        key={1}
        coordinate={{
          latitude: newPlace?.location?.lat ?? 43.6683,
          longitude: newPlace?.location?.lng ?? 18.9751,
        }}
        title={'Lokacija'}
        description={'Trenutna lokacija'}
      />
    </MapView>
  );
};

export default PickLocation;
const styles = StyleSheet.create({});
