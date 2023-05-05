import * as SQLite from 'expo-sqlite'
import { Place } from '../models/place'

const database = SQLite.openDatabase('places.db')

export function init() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}

export function insertPlace({
  title,
  imageUri,
  address,
  location: { lat, lng },
}) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places  (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

export function fetchPlaces() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) =>
          resolve(
            result.rows._array.map(
              (place) =>
                new Place(place.id, place.title, place.imageUri, {
                  address: place.address,
                  lat: place.lat,
                  lng: place.lng,
                })
            )
          ),
        (_, error) => reject(error)
      )
    })
  })
}

export function fetchPlaceDetails(id) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          const place = result.rows._array[0]

          resolve(
            new Place(place.id, place.title, place.imageUri, {
              lat: place.lat,
              lng: place.lng,
            })
          )
        },
        (_, error) => reject(error)
      )
    })
  })
}
