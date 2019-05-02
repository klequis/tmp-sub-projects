import { ObjectID } from  'mongodb'
import { omit } from 'ramda'

export const objectIdFromHexString = (hexId) => {
  try {
    return ObjectID.createFromHexString(hexId)
  }
  catch (e) {
    // console.error('error ---')
    console.error('ERROR /db/helpers.js.objectidFromHexString', e)
  }
}

export const getObjectId = async (id) => {
  if (ObjectID.isValid(id)) {
    return await objectIdFromHexString(id)
  }
}

export const removeIdProp = (obj) => {
  return omit(['_id'], obj)
}


// console.log('getObjectId - good', getObjectId('5ccb0df578d66d21de7ae4a1'))
// console.log('getObjectId - bad', getObjectId('abc'))
// objectIdFromHexString('abc')

const isValid = (id)  => {
  console.log('isValid', ObjectID.isValid(id))
}

// isValid('5ccb0df578d66d21de7ae4a1')
// isValid('abc')


const tryIt = (id) => {
  try {
    const a = ObjectID.createFromHexString(id)
    // console.log('a', a)
  }
  catch (e) {
    // console.log('ERROR: tryIt', e)
    throw e
  }
}


tryIt('abc')