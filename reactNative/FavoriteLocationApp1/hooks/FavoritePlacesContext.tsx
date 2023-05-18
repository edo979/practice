import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {
  PlaceT,
  RawPlaceT,
  createDB,
  dropTable,
  getPlacesFromDB,
  savePlacesToDB,
} from '../store/dt';

type FavoritePlacesContextT = {
  places: PlaceT[];
  fetchPlaces: () => void;
  savePlace: (place: RawPlaceT) => void;
  errorFromDB?: string;
};

const FavoritePlacesContext = createContext({} as FavoritePlacesContextT);

export function useFavoritePlacesContext() {
  return useContext(FavoritePlacesContext);
}

export function FavoritePlaceProvider({children}: {children: ReactNode}) {
  const [places, setPlaces] = useState<PlaceT[]>([]);
  const [errorFromDB, setErrorFromDb] = useState<string>();

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

  return (
    <FavoritePlacesContext.Provider
      value={{
        places,
        errorFromDB,
        fetchPlaces,
        savePlace,
      }}>
      {children}
    </FavoritePlacesContext.Provider>
  );
}
