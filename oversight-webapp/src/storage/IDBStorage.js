import { openDB, deleteDB, wrap, unwrap } from 'idb';

export async function IDBStorage(storeName) {
    'use strict'

    if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported')
        return
    }

    const dbName = 'oversightDB'
    const version = 1

    const db = await openDB(dbName, version, {
        upgrade(db, oldVersion, newVersion, transaction) {
            const store = db.createObjectStore(storeName)
            return store;
        }
    })

    return db;
};

export async function Put(db, storeName, value, key) {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    await store.put(value, key);
    await tx.done
}

export async function Get(db, storeName, key) {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    return await store.get(key);
}

export async function Delete(db, storeName, key) {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    await store.delete(key);
    await tx.done
}