import {Text, View, Image, PermissionsAndroid, Alert} from 'react-native';
import {main, mainStyle} from '../../constants/style';
import IconButton from './IconButton';
import {launchCamera} from 'react-native-image-picker';

type GetPhotoProps = {
  imgUri?: string;
};

const GetPhoto = ({imgUri}: GetPhotoProps) => {
  let content = <Text style={{fontSize: main.fsLG}}>Nema Fotografije</Text>;
  if (imgUri) content = <Image source={{}} />;

  async function takePhotoHandler() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Omiljeno mjesto',
          message:
            'Aplikacija omiljeno mjesto želi pristupiti kameri vašeg uređaja',
          buttonNeutral: 'Pitaj me kasnije',
          buttonNegative: 'Odbij',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const {assets} = await launchCamera({quality: 0.5, mediaType: 'photo'});

        if (!assets) throw new Error('No image!');
        console.log(assets[0].uri);
      } else {
        Alert.alert(
          'Upozorenje!',
          'Aplikacija nema dozvolu da koristi kameru. Da bi nastavili dalje morate promjeniti dozvole za ovu aplikaciju.',
        );
      }
    } catch (error) {
      Alert.alert('Upozorenje', 'Došlo je do greške, pokušajte ponovo.');
    }
  }

  return (
    <View style={{flex: 4, gap: 12}}>
      <View style={mainStyle.card}>{content}</View>
      <View>
        <IconButton onPress={takePhotoHandler} name="camera-alt" size={28}>
          Slikaj
        </IconButton>
      </View>
    </View>
  );
};

export default GetPhoto;
