import {StyleSheet} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';

function onMapPress(e: MapPressEvent) {
  const {latitude: lat, longitude: lng} = e.nativeEvent.coordinate;
  console.log('from pick location', lat, lng);
}

const PickLocation = () => {
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
        coordinate={{latitude: 43.6683, longitude: 18.9751}}
        title={'Lokacija'}
        description={'Trenutna lokacija'}
      />
    </MapView>
  );
};

export default PickLocation;
const styles = StyleSheet.create({});
