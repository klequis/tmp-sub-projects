import { expect } from 'chai'
import { fourTodos } from './fixture'
import {
  close,
  dropCollection,
  find,
  findById,
  findOneAndDelete,
  insertMany
} from '../../db'

after( async () => {
  await close()
})

describe('dbFunctions', () => {
  // describe('test find', function() {
  describe('test dropCollection', function() {
    it('dropCollection: should return true', async function() {
      const drop = await dropCollection('todos')
      expect(drop.data).to.be.true
    })
  })
  describe('test insertMany', function() {
    it('insertMany: should insert 4 todos', async function() {
      const i = await insertMany('todos', fourTodos)
      expect(i.data.result.n).to.equal(4)
    })
  })
  describe('test find', function() {
    it('find: should return 4 todos', async function() {
      const f = await find('todos')
      expect(f.data.length).to.equal(4)
    })
  })
    
  describe('test findById', function() {
    let idToFind = undefined
    before(async function() {
      await dropCollection('todos')
      const i = await insertMany('todos', fourTodos)
      idToFind = i.data.insertedIds[1].toString()
    })
    it('findById: should return 1 todo with id of second todo', async function() {
      const f = await findById('todos', idToFind)
      expect(f.data.length).to.equal(1)
      const idFound = f.data[0]._id.toString()
      expect(idFound).to.equal(idToFind)
    })
  })

  describe('test findOneAndDelete', function() {
    let idToDelete = undefined
    before(async function() {
      await dropCollection('todos')
      const i = await insertMany('todos', fourTodos)
      idToDelete = i.data.insertedIds[1].toString()
    })
    it('findOneAndDelete, should delete 1 of 4 todos', async function() {
      // const d = await findOneAndDelete('todos', 'abc')
      const d = await findOneAndDelete('todos', idToDelete)
      console.log('d', d)
      const idDeleted = d.data.value._id.toString()
      expect(idDeleted).to.equal(idToDelete)
      
    })
  })

})
