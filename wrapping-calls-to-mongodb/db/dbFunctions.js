import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'todo-dev'

let client

async function connectDB() {
  if (!client) {
    client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
  }
  return { db: client.db(dbName) }
}

const returnError = (e) => {
  return { data: [], error: e.message }
}

export const find = async (collection, query = {}, project = {}) => {
  try {
    const { db } = await connectDB()
    const ret = await db.collection(collection).find(query).project(project).toArray()
    return { data: ret, meta: {} }
  }
  catch (e) {
    console.error('ERROR: dbFunctions.find', e.message)
    return returnError(e)
  }
}