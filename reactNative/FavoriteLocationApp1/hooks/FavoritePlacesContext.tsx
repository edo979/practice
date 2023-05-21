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

type ErrorsT = {
  error?: string;
  name: string | null;
  address: string | null;
  imageUri: string | null;
  location: string | null;
};

type FavoritePlacesContextT = {
  places: PlaceT[];
  newPlace: NewPlaceT | undefined;
  errorFromDB?: string;
  fetchPlaces: () => void;
  savePlace: () => Promise<ErrorsT | null>;
  updateNewPlace: (newPlaceData?: NewPlaceT) => void;
};

function validateData(newPlace?: NewPlaceT) {
  if (!newPlace) return {error: 'Greška prilikom snimanja.'} as ErrorsT;

  const errors: ErrorsT = {
    name: newPlace.name ? null : 'Upišite naziv za novo mjesto.',
    address: newPlace.address ? null : 'Lokacija nije određena.',
    imageUri: newPlace.imageUri ? null : 'Novo mjesto nema slike.',
    location: newPlace.location ? null : 'Greška prilikom lociranja.',
  };

  return errors;
}

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

  async function savePlace() {
    const errors = validateData(newPlace);
    const hasErrors = Object.values(errors).some(Boolean);

    if (hasErrors) return errors;

    const isSave = await savePlacesToDB(newPlace as RawPlaceT);

    if (!isSave)
      return {error: 'Greška prilikom spremanja podataka'} as ErrorsT;

    fetchPlaces();
    return null;
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
