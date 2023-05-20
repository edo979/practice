import {StyleSheet} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import {LocationT} from './GetUserLocation';
import {useState} from 'react';

type MapPropsT = {
  location?: LocationT;
  dropPinOnMapHandler?: (latLng: LocationT) => void;
  style?: {};
};

const Map = ({location, dropPinOnMapHandler, style}: MapPropsT) => {
  const [state, setState] = useState<LocationT>({
    lat: location?.lat ?? 37.78825,
    lng: location?.lng ?? -122.4324,
  });

  function onMapPress(e: MapPressEvent) {
    if (!dropPinOnMapHandler) return;

    const {latitude: lat, longitude: lng} = e.nativeEvent.coordinate;

    setState({lat, lng});
    dropPinOnMapHandler({lat, lng});
  }

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
      onPress={onMapPress}>
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
