import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {PlaceT, createDB, getPlacesFromDB, savePlacesToDB} from '../store/dt';

type FavoritePlacesContextT = {
  places: PlaceT[];
  fetchPlaces: () => void;
  savePlace: (place: PlaceT) => void;
};

const FavoritePlacesContext = createContext({} as FavoritePlacesContextT);

export function useFavoritePlacesContext() {
  return useContext(FavoritePlacesContext);
}

export function FavoritePlaceProvider({children}: {children: ReactNode}) {
  const [places, setPlaces] = useState<PlaceT[]>([]);

  useEffect(() => {
    const init = async () => {
      createDB();
      await fetchPlaces();
    };

    init();
  }, []);

  async function fetchPlaces() {
    const placesFromDB = await getPlacesFromDB();
    //if (placesFromDB) setPlaces(placesFromDB);
  }
  async function savePlace(place: PlaceT) {
    await savePlacesToDB(place);
  }

  return (
    <FavoritePlacesContext.Provider
      value={{
        places,
        fetchPlaces,
        savePlace,
      }}>
      {children}
    </FavoritePlacesContext.Provider>
  );
}
