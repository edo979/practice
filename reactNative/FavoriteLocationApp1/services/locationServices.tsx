import {PermissionsAndroid} from 'react-native';
import {LocationT} from '../components/GetUserLocation';
import {GMA_KEY} from '../secrets';
import GetLocation from 'react-native-get-location';

export async function getAddress({lat, lng}: LocationT) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMA_KEY}`,
    );

    const data = await res.json();
    return data.results[0].formatted_address as string;
  } catch (error) {
    return null;
  }
}

export function getMapImage({lat, lng}: LocationT) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x300&markers=color:red%7C${lat},${lng}&key=${GMA_KEY}`;
}

export async function getLocationPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Upozorenje',
      message: 'Aplikacija želi pristup vašoj tačnoj lokaciji.',
      buttonPositive: 'OK',
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    const {latitude: lat, longitude: lng} =
      await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 6000,
      });

    return {lat, lng} as LocationT;
  } else {
    return null;
  }
}
