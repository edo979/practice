import {StyleSheet, Text, View, Image} from 'react-native';
import {DarkTheme, main} from '../../constants/style';

type ShowPhotoProps = {
  imgUri?: string;
};

const ShowPhoto = ({imgUri}: ShowPhotoProps) => {
  let content = <Text style={styles.textAlt}>Nema Fotografije</Text>;
  if (imgUri) content = <Image source={{}} />;

  return <View style={styles.container}>{content}</View>;
};

export default ShowPhoto;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: main.borderRadius,
    borderWidth: 1,
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.card,
  },
  textAlt: {
    fontSize: main.fsLG,
  },
});
