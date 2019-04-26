import { find } from '../db'

async function findTest() {
  const todos = await find('todos')
  console.log('todos', todos)
}

findTest()