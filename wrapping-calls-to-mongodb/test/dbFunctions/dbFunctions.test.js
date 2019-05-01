import { expect } from 'chai'
import util from 'util'
import { fourTodos } from './fixture'
import {
  close,
  dropCollection,
  find,
  findById,
  insertMany
} from '../../db'
import { green } from '../../logger';

after( async () => {
  await close()
})

describe('dbFunctions', () => {
  describe('test find', function() {
    before(async function() {
      await dropCollection('todos')
    })

    it('should insert 4 todos', async function() {
      const insert = await insertMany('todos', fourTodos)
      expect(insert.data.ops.length).to.equal(4)
    })

    it('should return 4 todos', async function() {
      const f = await find('todos')
      expect(f.data.length).to.equal(4)
    })
  })

  describe('test findById', function() {
    let idToFind = undefined
    before(async function() {
      await dropCollection('todos')
      await insertMany('todos', fourTodos)
      const f = await find('todos', {})
      // console.log('f', f)
      // get the Id of the second result returned
      idToFind = f.data[1]._id.toString()
    })
    it('should return 1 todo with id of second todo', async function() {
      const f = await findById('todos', idToFind)
      expect(f.data.length).to.equal(1)
      console.log('f.data[0]._id', f.data[0]._id)
      console.log(typeof idToFind)
      const idFound = f.data[0]._id.toString()
      expect(idFound).to.equal(idToFind)
    })
  })


})
