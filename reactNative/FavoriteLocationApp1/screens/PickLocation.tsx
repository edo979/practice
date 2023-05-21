import {StyleSheet} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';

const PickLocation = () => {
  const {updateNewPlace, newPlace} = useFavoritePlacesContext();

  function onMapPress(e: MapPressEvent) {
    const {latitude: lat, longitude: lng} = e.nativeEvent.coordinate;
    updateNewPlace({location: {lat, lng}});
  }

  return (
    <MapView
      provider={'google'}
      showsMyLocationButton={true}
      mapType="standard"
      initialRegion={{
        latitude: 43.6683,
        longitude: 18.9751,
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
          longitude: newPlace?.location?.lng || 18.9751,
        }}
        title={'Lokacija'}
        description={'Trenutna lokacija'}
      />
    </MapView>
  );
};

export default PickLocation;
const styles = StyleSheet.create({});
