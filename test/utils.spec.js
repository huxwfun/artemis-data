import {
  createEntitiesShapeFromTypes,
  mergeEntities,
  updateEntities,
  removeEntities
} from '../src/utils'

describe('utils tests', () => {
  it('should create entities object according to schemas', () => {
    const entities = createEntitiesShapeFromTypes(['users', 'books'])

    expect(entities).toEqual({ books: {}, users: {} })
  })
  it('should merge entities successfully', () => {
    const user1 = {
      1: { firstName: 'user1-firstName', lastName: 'user1-lastName' }
    }
    const user2 = {
      2: { firstName: 'user2-firstName', lastName: 'user2-lastName' }
    }

    const newUser1 = { 1: { name: 'newuser1' } }
    const newUser2 = {
      2: {
        name: 'newuser2',
        firstName: 'user1-firstName',
        lastName: 'user1-lastName'
      }
    }
    // replace entities with new ones
    expect(
      mergeEntities(
        { books: {}, users: { ...user1, ...user2 } },
        { users: { ...newUser1, ...newUser2 } }
      )
    ).toEqual({ books: {}, users: { ...newUser1, ...newUser2 } })
    // add new entities
    expect(
      mergeEntities({ users: { ...user1 } }, { users: { ...user2 } })
    ).toEqual({
      users: { ...user1, ...user2 }
    })
    // add new entities to undefined key
    expect(mergeEntities({}, { users: { ...user2 } })).toEqual({
      users: { ...user2 }
    })
  })
  it('should update entities successfully', () => {
    const entities = {
      users: {
        1: { name: 'user' },
        2: { name: 'user2' }
      }
    }
    const patches = {
      users: {
        1: { name: 'name', firstName: 'firstName' }, // replace and new attr
        2: { firstName: 'firstName2' }, // new attr
        3: { name: 'user3' } // ignored
      },
      books: {
        1: { name: 'book1' } // ignored
      }
    }
    expect(updateEntities(entities, patches)).toEqual({
      users: {
        1: { name: 'name', firstName: 'firstName' },
        2: { name: 'user2', firstName: 'firstName2' }
      }
    })
  })
  it('should delete entities', () => {
    const user1 = {
      1: { firstName: 'user1-firstName', lastName: 'user1-lastName' }
    }
    const user2 = {
      2: { firstName: 'user2-firstName', lastName: 'user2-lastName' }
    }
    const file = { 1: {} }
    // replace entities with new ones
    expect(
      removeEntities({ users: { ...user1, ...user2 }, files: file }, 'users', [
        1
      ])
    ).toEqual({
      users: user2,
      files: file
    })

    expect(
      removeEntities(
        {
          files: file
        },
        'users',
        [1]
      )
    ).toEqual({
      users: {},
      files: file
    })
    expect(
      removeEntities(
        {
          files: file
        },
        'files'
      )
    ).toEqual({
      files: file
    })
  })
})
