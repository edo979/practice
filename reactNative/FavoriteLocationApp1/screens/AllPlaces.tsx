import {StyleSheet, Text, View} from 'react-native';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';

const AllPlaces = () => {
  const {} = useFavoritePlacesContext();

  return (
    <View>
      <Text>AllPlaces</Text>
    </View>
  );
};

export default AllPlaces;
const styles = StyleSheet.create({});
