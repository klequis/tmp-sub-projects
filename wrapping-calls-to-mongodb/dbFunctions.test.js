// import 'babel-polyfill'
import { expect } from 'chai'
import util from 'util'
import { fourTodos } from './fixture'
import { close, dropCollection, find, insertMany } from '../../db'
// import { green } from '../../logger';

const setTimeoutPromise = util.promisify(setTimeout)

before( async () => {
  await dropCollection('todos')
})

after( async () => {
  await close()
  if (!process.env.WATCH) {
    await setTimeoutPromise(1900)
    process.exit(0)
  }
})

describe('dbFunctions', () => {

  let pid

  before( async () => {
    await dropCollection('todos')
  })

  it('should insert 4 todos', async () => {
    const insert = await insertMany('todos', fourTodos)
    expect(insert.data.ops.length).to.equal(4)
  })

  it('should return 4 todos', async () => {
    const f = await find('todos')
    expect(f.data.length).to.equal(4)
  })
})
