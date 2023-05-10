import {StyleSheet, Text, TextInput, View} from 'react-native';
import {DarkTheme, main} from '../constants/style';
import Photo from '../components/ui/Photo';
import Map from '../components/ui/Map';

const AddPlace = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Naziv:</Text>
        <TextInput style={styles.input} />
      </View>
      <Photo />
      <Map />
    </View>
  );
};

export default AddPlace;
const styles = StyleSheet.create({
  container: {
    padding: main.padding,
    gap: 18,
  },
  label: {
    fontSize: main.fsMD,
    color: DarkTheme.colors.border,
  },
  input: {
    marginTop: main.verticalSpacing,
    paddingHorizontal: 8,
    borderRadius: main.borderRadius,
    borderWidth: 1,
    borderColor: DarkTheme.colors.border,
    fontSize: main.fsLG,
    color: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.card,
  },
});
