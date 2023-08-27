const dbPromise = idb.open('posts-store', 1, function (db) {
  if (!db.objectStoreNames.contains('posts'))
    db.createObjectStore('posts', { keyPath: 'id' })
})

function writeData(st, data) {
  return dbPromise.then((db) => {
    const tx = db.transaction(st, 'readwrite')
    const store = tx.objectStore(st)
    store.put(data)
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
