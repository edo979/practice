import {LocationT} from '../components/GetUserLocation';
import {GMA_KEY} from '../secrets';

export async function getAddress({lat, lng}: LocationT) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMA_KEY}`,
    );

    const data = await res.json();
    return data.results[0].formatted_address as string;
  } catch (error) {
    return 'Greška pri određivanju adrese.';
  }
}
