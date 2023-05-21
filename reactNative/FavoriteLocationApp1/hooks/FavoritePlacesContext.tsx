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

type NewPlaceT = {
  name?: string;
  address?: string;
  imageUri?: string;
  location?: LocationT;
};

type FavoritePlacesContextT = {
  places: PlaceT[];
  newPlace: NewPlaceT | undefined;
  errorFromDB?: string;
  fetchPlaces: () => void;
  savePlace: (place: RawPlaceT) => void;
  updateNewPlace: (newPlaceData?: NewPlaceT) => void;
};

const FavoritePlacesContext = createContext({} as FavoritePlacesContextT);

export function useFavoritePlacesContext() {
  return useContext(FavoritePlacesContext);
}

export function FavoritePlaceProvider({children}: {children: ReactNode}) {
  const [places, setPlaces] = useState<PlaceT[]>([]);
  const [errorFromDB, setErrorFromDb] = useState<string>();
  const [newPlace, setNewPlace] = useState<NewPlaceT>();

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

  function updateNewPlace(data?: NewPlaceT) {
    if (!data) {
      setNewPlace(undefined);
    } else {
      setNewPlace(prev => ({...prev, ...data}));
    }
  }

  return (
    <FavoritePlacesContext.Provider
      value={{
        places,
        newPlace,
        errorFromDB,
        fetchPlaces,
        savePlace,
        updateNewPlace,
      }}>
      {children}
    </FavoritePlacesContext.Provider>
  );
}
