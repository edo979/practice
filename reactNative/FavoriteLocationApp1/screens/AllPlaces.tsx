import {StyleSheet, Text, FlatList, View, Image, Pressable} from 'react-native';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {DarkTheme, mainStyle} from '../constants/style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamListT} from '../App';
import {useIsFocused} from '@react-navigation/native';

type AllPlacesProps = NativeStackScreenProps<StackParamListT>;

const ImageContent = ({source}: {source: string}) => {
  if (source === '')
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: DarkTheme.util.fsLG,
          }}>
          Nema slike
        </Text>
      </View>
    );

  return <Image source={{uri: source}} style={styles.image} />;
};

const AllPlaces = ({navigation}: AllPlacesProps) => {
  const {places} = useFavoritePlacesContext();
  const isFocused = useIsFocused();

  console.log(isFocused);

  if (places.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Nijedno mjesto nije dodano, krenite dodavati mjesta.
        </Text>
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      data={places}
      renderItem={({item: place}) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Place', {place})}>
          <ImageContent source={place.imageUri} />

          <View style={styles.detailsContainer}>
            <Text style={[styles.text, styles.title]}>{place.name}</Text>
            <Text style={styles.text}>{place.address}</Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default AllPlaces;
const styles = StyleSheet.create({
  container: {
    padding: DarkTheme.util.padding,
  },
  itemContainer: {
    ...mainStyle.card,
    height: 100,
    marginBottom: DarkTheme.util.verticalSpacing,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: DarkTheme.util.fsXL,
  },
  text: {
    fontSize: DarkTheme.util.fsMD,
    color: DarkTheme.colors.text,
  },
  image: {
    ...DarkTheme.imageBaseStyle,
    borderRadius: DarkTheme.util.borderRadius,
    flex: 1,
  },
  detailsContainer: {
    flex: 2,
  },
});
