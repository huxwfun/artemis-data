import { actions, reducer } from '../utils/reduxBindingUtils'

describe('requests reducer tests', () => {
  const initialState = { requests: { 0: 0, 1: 1 }, entities: {} }
  const requestKey = 'request'
  const request1 = { a: 'a' }
  const state1 = {
    requests: { ...initialState.requests, [requestKey]: request1 },
    entities: {}
  }
  const request2 = { a: 'aa', b: 'b' }
  const state2 = {
    requests: { ...initialState.requests, [requestKey]: request2 },
    entities: {}
  }
  const request3 = { c: 'c' }
  const state3 = {
    requests: { ...initialState.requests, [requestKey]: request3 },
    entities: {}
  }

  it('should create reducer successfully', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      requests: {},
      entities: {}
    })
  })
  it('should process setRequest actions correctly', () => {
    const { setRequest } = actions
    let currentState = initialState
    currentState = reducer(currentState, setRequest(requestKey, request1))
    expect(currentState).toEqual(state1)
    currentState = reducer(currentState, setRequest(requestKey, request2))
    expect(currentState).toEqual(state2)
    currentState = reducer(currentState, setRequest(requestKey, request3))
    expect(currentState).toEqual(state3)
  })
})

describe('entities reducer tests', () => {
  it('should process addEntities actions correctly', () => {
    const { addEntities } = actions

    const user1 = {
      1: { firstName: 'user1-firstName', lastName: 'user1-lastName' }
    }
    const user3 = {
      3: { firstName: 'user3-firstName', lastName: 'user3-lastName' }
    }

    const newUser1 = { 1: { name: 'newuser1' } }
    const newUser2 = {
      2: {
        name: 'newuser2',
        firstName: 'user1-firstName',
        lastName: 'user1-lastName'
      }
    }

    let currentState = {
      requests: {},
      entities: { users: { ...user1, ...user3 } }
    }

    currentState = reducer(
      currentState,
      addEntities({ users: { ...newUser1, ...newUser2 } })
    )
    expect(currentState).toEqual({
      requests: {},
      entities: { users: { ...newUser1, ...newUser2, ...user3 } }
    })
  })

  it('should process updateEntities actions correctly', () => {
    const { updateEntities } = actions

    const user1 = {
      1: { firstName: 'user1-firstName', lastName: 'user1-lastName' }
    }
    const user3 = {
      3: { firstName: 'user3-firstName', lastName: 'user3-lastName' }
    }

    let currentState = {
      requests: {},
      entities: { users: { ...user1, ...user3 } }
    }

    currentState = reducer(
      currentState,
      updateEntities({
        users: {
          1: { firstName: 'user1-firstName-2 ' },
          2: { name: 'name2' },
          3: { name: 'name3' }
        }
      })
    )
    expect(currentState).toEqual({
      requests: {},
      entities: {
        users: {
          1: { firstName: 'user1-firstName-2 ', lastName: 'user1-lastName' },
          3: {
            firstName: 'user3-firstName',
            lastName: 'user3-lastName',
            name: 'name3'
          }
        }
      }
    })
  })

  it('should process removeEntities actions correctly', () => {
    const { removeEntities } = actions
    const user1 = {
      1: { firstName: 'user1-firstName', lastName: 'user1-lastName' }
    }
    const user2 = {
      2: {
        name: 'newuser2',
        firstName: 'user1-firstName',
        lastName: 'user1-lastName'
      }
    }
    const user3 = {
      3: { firstName: 'user3-firstName', lastName: 'user3-lastName' }
    }

    let currentState = {
      requests: {},
      entities: { users: { ...user1, ...user2, ...user3 } }
    }

    currentState = reducer(currentState, removeEntities('users', [1, 3]))
    expect(currentState).toEqual({
      requests: {},
      entities: { users: { ...user2 } }
    })
  })
})
