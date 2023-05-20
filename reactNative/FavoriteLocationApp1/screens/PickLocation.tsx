import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamListT} from '../App';
import Map from '../components/Map';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {LatLng} from 'react-native-maps';

type PickLocationPropsT = NativeStackScreenProps<
  StackParamListT,
  'PickLocation'
>;

const PickLocation = ({navigation}: PickLocationPropsT) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Odaberi Lokaciju',
      headerRight: ({tintColor}) => (
        <NavigationIconBtn onPress={onSave} name="save" color={tintColor}>
          Snimi
        </NavigationIconBtn>
      ),
    });
  });

  function pickLocationHandler(latLng: LatLng) {
    console.log(latLng);
  }

  function onSave() {
    console.log('save new place location');
  }

  return <Map dropPinOnMapHandler={pickLocationHandler} />;
};

export default PickLocation;
const styles = StyleSheet.create({});
