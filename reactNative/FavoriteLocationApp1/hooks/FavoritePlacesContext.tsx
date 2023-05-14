import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {createDB} from '../store/dt';

const FavoritePlacesContext = createContext({});

export function useFavoritePlacesContext() {
  return useContext(FavoritePlacesContext);
}

export function FavoritePlaceProvider({children}: {children: ReactNode}) {
  return (
    <FavoritePlacesContext.Provider value={{}}>
      {children}
    </FavoritePlacesContext.Provider>
  );
}
