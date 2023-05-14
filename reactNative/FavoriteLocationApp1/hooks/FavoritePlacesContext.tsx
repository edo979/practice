import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {createDB, getPlacesFromDB} from '../store/dt';

type PlaceT = {
  id: number;
  name: string;
  address: string;
  location: {lon: number; lng: number};
};

type FavoritePlacesContextT = {
  places: PlaceT[];
  fetchPlaces: () => void;
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

  return (
    <FavoritePlacesContext.Provider
      value={{
        places,
        fetchPlaces,
      }}>
      {children}
    </FavoritePlacesContext.Provider>
  );
}
