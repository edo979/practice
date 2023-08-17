const dbPromise = idb.open('posts-store', 1, function (db) {
  if (!db.objectStoreNames.contains('posts'))
    db.createObjectStore('posts', { keyPath: 'id' })
})

function writeData() {
  const sampleDate = {
    id: 'id58',
    title: 'jah jah',
    location: 'Location',
    image:
      'http://127.0.0.1:9199/v0/b/pwagram-practice.appspot.com/o/sf-boat.jpg?alt=media&token=aabb266e-2faa-4573-b0d0-63b713267d20',
  }

  return dbPromise.then((db) => {
    const tx = db.transaction('posts', 'readwrite')
    const store = tx.objectStore('posts')
    store.put(sampleDate)
    return tx.complete
  })
}

function readAllData() {
  return dbPromise.then((db) => {
    const tx = db.transaction('posts', 'readonly')
    const store = tx.objectStore('posts')
    return store.getAll()
  })
}
