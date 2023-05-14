import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

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
    const results = await db.transaction(tx =>
      tx.executeSql(`SELECT * FROM places`),
    );

    console.log(results);
    return results;
  } catch (error) {
    return null;
  }
}
