import { storeKey, selectors } from '../utils/reduxBindingUtils'

describe('selectors tests', () => {

  const request1 = { request1: 'request1' }
  const request2 = { request1: 'request2' }
  const entity1 = { entity1: 'entity1' }
  const entity2 = { entity2: 'entity2' }
  const state = {
    [storeKey]: {
      requests: {
        1: request1,
        2: request2
      },
      entities: {
        1: entity1,
        2: entity2
      }
    }
  }
  it('should create request selector successfully', () => {
    expect(selectors.request(2, state)).toBe(request2)
    expect(selectors.request(3, state)).toBeNull()
  })
  it('should create entities selector successfully', () => {
    const entites = selectors.entities(state)
    expect(entites['1']).toBe(entity1)
    expect(entites['2']).toBe(entity2)
  })
})
