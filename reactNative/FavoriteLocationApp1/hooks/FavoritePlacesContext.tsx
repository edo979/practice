import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {
  PlaceT,
  RawPlaceT,
  createDB,
  dropTable,
  getPlacesFromDB,
  savePlacesToDB,
} from '../store/dt';
import {LocationT} from '../components/GetUserLocation';
import {getAddress} from '../services/locationServices';

type FavoritePlacesContextT = {
  places: PlaceT[];
  placeLocation: LocationT | undefined;
  errorFromDB?: string;
  fetchPlaces: () => void;
  savePlace: (place: RawPlaceT) => void;
  setLocation: (location: LocationT) => void;
};

const FavoritePlacesContext = createContext({} as FavoritePlacesContextT);

export function useFavoritePlacesContext() {
  return useContext(FavoritePlacesContext);
}

export function FavoritePlaceProvider({children}: {children: ReactNode}) {
  const [places, setPlaces] = useState<PlaceT[]>([]);
  const [errorFromDB, setErrorFromDb] = useState<string>();
  const [placeLocation, setPlaceLocation] = useState<LocationT>();

  useEffect(() => {
    const init = async () => {
      // dropTable();
      createDB();
      await fetchPlaces();
    };

    init();
  }, []);

  async function fetchPlaces() {
    const placesFromDB = await getPlacesFromDB();
    if (placesFromDB && placesFromDB.length > 0) setPlaces(placesFromDB);
  }

  async function savePlace(place: RawPlaceT) {
    if ((await savePlacesToDB(place)) === false) {
      setErrorFromDb('Greška prilikom spremanja podataka');
    }
    fetchPlaces();
  }

  async function setLocation(location: LocationT) {
    setPlaceLocation(location);
  }

  return (
    <FavoritePlacesContext.Provider
      value={{
        places,
        placeLocation,
        errorFromDB,
        fetchPlaces,
        savePlace,
        setLocation,
      }}>
      {children}
    </FavoritePlacesContext.Provider>
  );
}
