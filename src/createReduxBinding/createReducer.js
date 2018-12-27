import { combineReducers } from 'redux'
import { mergeEntities, updateEntities, removeEntities } from '../utils'

const createRequestsReducer = SET_REQUEST => {
  return (state = {}, action) => {
    if (action.type === SET_REQUEST) {
      const { key, ...nextState } = action.payload
      return {
        ...state,
        [key]: nextState
      }
    }
    return state
  }
}

const createEntitiesReducer = (ADD_ENTITIES, UPDATE_ENTITIES, REMOVE_ENTITIES) => (
  state = {},
  action
) => {
  switch (action.type) {
    case ADD_ENTITIES: {
      const entities = action.payload
      return mergeEntities(state, entities)
    }
    case UPDATE_ENTITIES: {
      const patches = action.payload
      return updateEntities(state, patches)
    }
    case REMOVE_ENTITIES: {
      const { type, ids } = action.payload
      return removeEntities(state, type, ids)
    }
    default:
      return state
  }
}

export default ({ SET_REQUEST, ADD_ENTITIES, UPDATE_ENTITIES, REMOVE_ENTITIES }) =>
  combineReducers({
    requests: createRequestsReducer(SET_REQUEST),
    entities: createEntitiesReducer(ADD_ENTITIES, UPDATE_ENTITIES, REMOVE_ENTITIES)
  })
