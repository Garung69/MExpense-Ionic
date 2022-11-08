import { Trip } from './model/Trip'
import { openDB } from "idb"
const dbName = "ExpenseDB"
initDB().then(() => {
    console.log("Database intialize complete!")
})

export const insertTrip = async (trip: Trip) => {
    const db = await openDB(dbName, 1)
    const key = await db.put('trip', trip)
    console.log("Inserted trip: " + key)
}
export const getallTrip = async () => {
    const db = await openDB(dbName, 1)
    return await db.getAll('trip')
}
export const getTrip = async (id: number) => {
    const db = await openDB(dbName, 1)
    return await db.get('trip',id)
}

export const deleteTrip = async (id: number) => {
    const db = await openDB(dbName, 1)
    return await db.delete('trip',id)
}
export const deleteAllTripdb = async () => {
    const db = await openDB(dbName, 1)
    return await db.clear('trip')
}
async function initDB() {
    const db = await openDB(dbName, 1, {
        upgrade(db) {
            const store = db.createObjectStore('trip', {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    })
}