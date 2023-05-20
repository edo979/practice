import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamListT} from '../App';
import Map from '../components/Map';
import {useLayoutEffect} from 'react';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {LocationT} from '../components/GetUserLocation';

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

  function onSave() {}

  return <Map />;
};

export default PickLocation;
const styles = StyleSheet.create({});
