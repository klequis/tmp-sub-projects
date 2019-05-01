import { ObjectID } from  'mongodb'
import { omit } from 'ramda'

export const objectIdFromHexString = (hexId) => {
  try {
    return ObjectID.createFromHexString(hexId)
  }
  catch (e) {
    console.error('ERROR /db/helpers.js.objectidFromHexString', e)
  }
}

export const getObjectId = (id) => {
  return typeof id === 'object' ? id : objectIdFromHexString(id)
}

export const removeIdProp = (obj) => {
  return omit(['_id'], obj)
}