import {StyleSheet} from 'react-native';
import MapView, {LatLng, Marker} from 'react-native-maps';
import {LocationT} from './GetUserLocation';
import {useState} from 'react';

type MapPropsT = {
  location?: LocationT;
  dropPinOnMapHandler?: (latLng: LatLng) => void;
  style?: {};
};

const Map = ({location, dropPinOnMapHandler, style}: MapPropsT) => {
  const [state, setState] = useState<LocationT>({
    lat: location?.lat ?? 37.78825,
    lng: location?.lng ?? -122.4324,
  });

  return (
    <MapView
      provider={'google'}
      showsMyLocationButton={true}
      mapType="standard"
      initialRegion={{
        latitude: state.lat,
        longitude: state.lng,
        latitudeDelta: 0.035,
        longitudeDelta: 0.01,
      }}
      style={{flex: 1, height: '100%', width: '100%', ...style}}
      onPress={e =>
        dropPinOnMapHandler && dropPinOnMapHandler(e.nativeEvent.coordinate)
      }>
      <Marker
        key={1}
        coordinate={{latitude: state.lat, longitude: state.lng}}
        title={'Lokacija'}
        description={'Trenutna lokacija'}
      />
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({});
