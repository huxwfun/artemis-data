export default ({
  ADD_ENTITIES, UPDATE_ENTITIES, REMOVE_ENTITIES, SET_REQUEST
}) => ({
  setRequest: (key, state = {}) => ({
    type: SET_REQUEST,
    payload: { key, ...state }
  }),
  addEntities: entities => ({
    type: ADD_ENTITIES,
    payload: entities
  }),
  updateEntities: (patches) => ({
    type: UPDATE_ENTITIES,
    payload: patches
  }),
  removeEntities: (type, ids) => ({
    type: REMOVE_ENTITIES,
    payload: { type, ids }
  })
})