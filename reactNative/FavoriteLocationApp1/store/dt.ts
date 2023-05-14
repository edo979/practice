import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

export type PlaceT = {
  id: number;
  name: string;
  address: string;
  location: {lat: number; lng: number};
};

enablePromise(true);

const getDBConnection = async () =>
  openDatabase({name: 'places.db', location: 'default'});

export async function createDB() {
  const db: SQLiteDatabase = await getDBConnection();

  try {
    await db.transaction(tx => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`);
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getPlacesFromDB() {
  const db = await getDBConnection();

  try {
    const results = await db.executeSql(`SELECT * FROM places`, []);
    console.log(results.map(item => console.log(item)));
  } catch (error) {
    return null;
  }
}

export async function savePlacesToDB({name, address, location}: PlaceT) {
  const db = await getDBConnection();

  try {
    const result = await db.executeSql(
      'INSERT INTO places(name, address, lat, lng) VALUES(?, ?, ?, ?, ?)',
      [name, address, location.lat, location.lng],
    );
    console.log(result[0].insertId);
  } catch (error) {
    console.log(error);
  }
}
