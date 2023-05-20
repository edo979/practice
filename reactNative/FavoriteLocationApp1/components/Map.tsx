import {StyleSheet} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import {LocationT} from './GetUserLocation';
import {useState} from 'react';

type MapPropsT = {
  location?: LocationT;
  style?: {};
};

const Map = ({location, style}: MapPropsT) => {
  const [state, setState] = useState<LocationT>({
    lat: location?.lat ?? 43.6683,
    lng: location?.lng ?? 18.9751,
  });

  function onMapPress(e: MapPressEvent) {
    if (location) return;
    const {latitude: lat, longitude: lng} = e.nativeEvent.coordinate;
    setState({lat, lng});
  }

  return (
    <MapView
      provider={'google'}
      showsMyLocationButton={true}
      mapType="standard"
      initialRegion={{
        latitude: state.lat,
        longitude: state.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.01,
      }}
      minZoomLevel={5}
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
