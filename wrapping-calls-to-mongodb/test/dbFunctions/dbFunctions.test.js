// import 'babel-polyfill'
import { expect } from 'chai'
import { people, person } from './fixture'
import {
  dropCollection,
  find,
  insertMany
} from '../../db'


const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)

const dropPeopleCollection = () => {
  try {
    dropCollection('people')
  }
  catch (e) {
    console.error('ERROR: before', e)
  }
}
const dropAllCollections = () => {
  try {
    dropCollection('people')
    dropCollection('events')
    dropCollection('postalCodes')
  }
  catch (e) {
    console.error('ERROR: before', e)
  }
}

before(() => {
  dropAllCollections()
})

after(() => {
  // dropAllCollections()
  if (!process.env.WATCH) {
    setTimeoutPromise(1900).then((value) => {
      process.exit(0)
    })
  }
})

describe('dbFunctions', () => {
  before(() => {
    dropPeopleCollection()
  })

  let pid

  it('should add more than one person', async () => {
    const insert = await insertMany('people', people)

    const data = insert.data
    console.log('data', data.ops)
    // expect(data.length).to.equal(4)
  })

  it('should find 4 people', async () => {
    const f = await find('people')
    const fdata = f.data
    console.log('data', f)
    expect(f.data.length).to.equal(4)
  })



})
