import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {main} from '../constants/style';
import ShowPhoto from '../components/ui/ShowPhoto';

const AddPlace = () => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: main.fsMD, color: colors.border}}>Naziv:</Text>
        <TextInput
          style={[
            {
              color: colors.border,
              backgroundColor: colors.card,
            },
            styles.input,
          ]}
        />
      </View>
      <ShowPhoto />
    </View>
  );
};

export default AddPlace;
const styles = StyleSheet.create({
  container: {
    padding: main.padding,
    gap: 12,
  },
  input: {
    marginTop: main.verticalSpacing,
    paddingHorizontal: 8,
    borderRadius: main.borderRadius,
    fontSize: main.fsLG,
  },
});
