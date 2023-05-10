import {Text, View, Image} from 'react-native';
import {main, mainStyle} from '../../constants/style';
import IconButton from './IconButton';

type ShowPhotoProps = {
  imgUri?: string;
};

const ShowPhoto = ({imgUri}: ShowPhotoProps) => {
  let content = <Text style={{fontSize: main.fsLG}}>Nema Fotografije</Text>;
  if (imgUri) content = <Image source={{}} />;

  return (
    <View style={{flex: 4, gap: 12}}>
      <View style={mainStyle.card}>{content}</View>
      <View>
        <IconButton onPress={() => {}} name="camera-alt" size={28}>
          Slikaj
        </IconButton>
      </View>
    </View>
  );
};

export default ShowPhoto;
