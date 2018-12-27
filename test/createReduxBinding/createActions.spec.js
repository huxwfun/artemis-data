import { actionTypes, actions } from '../utils/reduxBindingUtils'

describe('create actionTypes tests', () => {
  it('should create actionTypes successfully', () => {
    const {
      SET_REQUEST,
      ADD_ENTITIES,
      UPDATE_ENTITIES,
      REMOVE_ENTITIES
    } = actionTypes
    const { setRequest, addEntities, updateEntities, removeEntities } = actions

    expect(setRequest('key')).toEqual({
      type: SET_REQUEST,
      payload: { key: 'key' }
    })
    expect(setRequest('key', { abc: 'abc' })).toEqual({
      type: SET_REQUEST,
      payload: { key: 'key', abc: 'abc' }
    })
    expect(addEntities({ abc: 'abc' })).toEqual({
      type: ADD_ENTITIES,
      payload: { abc: 'abc' }
    })
    expect(updateEntities({ abc: 'abc' })).toEqual({
      type: UPDATE_ENTITIES,
      payload: { abc: 'abc' }
    })
    expect(removeEntities('type', [1, 2, 3])).toEqual({
      type: REMOVE_ENTITIES,
      payload: { type: 'type', ids: [1, 2, 3] }
    })
  })
})

// setRequest: (key, state = {}) => ({
//   type: SET_REQUEST,
//   payload: { key, ...state }
// }),
// addEntities: entities => ({
//   type: ADD_ENTITIES,
//   payload: entities
// }),
// updateEntities: (patches) => ({
//   type: UPDATE_ENTITIES,
//   payload: patches
// }),
// removeEntities: (type, ids) => ({
//   type: REMOVE_ENTITIES,
//   payload: { type, ids }
// })
