import { actionTypes, storeKey } from '../utils/reduxBindingUtils'

describe('create actionTypes tests', () => {
  it('should create actionTypes successfully', () => {
    const { SET_REQUEST, ADD_ENTITIES, REMOVE_ENTITIES } = actionTypes
    expect(SET_REQUEST).toEqual(`${storeKey}/set_request`)
    expect(ADD_ENTITIES).toEqual(`${storeKey}/add_entities`)
    expect(REMOVE_ENTITIES).toEqual(`${storeKey}/remove_entities`)
  })
})
