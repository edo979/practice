import {StyleSheet, Text, View} from 'react-native';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';

const AllPlaces = () => {
  const {places} = useFavoritePlacesContext();

  if (!places || places.length === 0)
    return <Text>Nijedno mjesto nije dodano, krenite dodavati mjesta.</Text>;

  return (
    <View>
      <Text>AllPlaces</Text>
    </View>
  );
};

export default AllPlaces;
const styles = StyleSheet.create({});
