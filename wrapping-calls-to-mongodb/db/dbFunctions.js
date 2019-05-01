import mongodb from 'mongodb'
import { getObjectId, removeIdProp } from './helpers'

const MongoClient = mongodb.MongoClient
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'todo-dev'

let client

export const connectDB = async () => {
  if (!client) {
    client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
  }
  return { db: client.db(dbName) }
}

export const close = async ()  => {
  if (client) {
    client.close()
  }
  client = undefined
}


const formatReturnSuccess = (data)  => {
  return { data: data, error: '' }
}

const formatReturnError = (error)  => {
  return { data: [], error: error.message }
}

const logError = (functionName, error)  => {
  console.error(`Error: dbFunctions.${functionName}`, error.message)
}

export const dropCollection = async (collection) => {
  try {
    const { db } = await connectDB()
    const ret = await db.collection(collection).drop()

    return formatReturnSuccess(ret)
  }
  catch (e) {
    if (e.message = 'ns not found') {
      return true
    } else {
      logError('dropCollection', e)
      return formatReturnError(e)
    }
  }
}

export const find = async (collection, filter = {}, project = {}) => {
  try {
    const { db } = await connectDB()
    const ret = await db.collection(collection).find(filter).project(project).toArray()
    return formatReturnSuccess(ret)
  }
  catch (e) {
    logError('find', e)
    return formatReturnError(e)
  }
}

export const findById = async (collection, id, project = {}) => {
  try {
    const objId = getObjectId(id)
    const { db } = await connectDB()
    const ret = await db.collection(collection).find({ _id: objId }).project(project).toArray()
    return formatReturnSuccess(ret)
  }
  catch (e) {
    logError('findById', e)
    return formatReturnError(e)
  }
}

export const findOneAndDelete = async (collection, id) => {
  try {
    const objId = getObjectId(id)
    const { db } = await connectDB()
    const ret = await db.collection(collection).findOneAndDelete({ _id: objId })
    return formatReturnSuccess(ret)
  }
  catch (e) {
    logError('findOneAndDelete', e)
    return formatReturnError(e)
  }
}

export const findOneAndUpdate = async (collection, id, filter, returnOriginal = false) => {
  try {
    // if the filter has the _id prop, remove it
    const cleanFilter = removeIdProp(filter)
    const { db } = await connectDB()
    const objId = getObjectId(id)
    const ret = await db.collection(collection).findOneAndUpdate(
      { _id: objId },
      { $set: cleanFilter },
      { returnOriginal: returnOriginal }
    )
    return formatReturnSuccess(ret)
  }
  catch (e) {
    console.warn('ERROR: dbFunctions.findOneAndUpdate', e)
    return formatReturnError(e)
  }
}

export const insertMany = async (collection, data) => {
  try {
    const { db } = await connectDB()
    const ret = await db.collection(collection).insertMany(data)
    return formatReturnSuccess(ret)
  }
  catch (e) {
    console.warn('ERROR: dbFunctions.insertMany', e.message)
    return formatReturnError(e)
  }
}

export const insertOne = async (collection, data) => {
  try {
    const { db } = await connectDB()
    const ret = await db.collection(collection).insertOne(data)
    return formatReturnSuccess(ret)
  }
  catch (e) {
    console.error('ERROR: dbFunctions.insertOne', e)
    return formatReturnError(e)
  }

}