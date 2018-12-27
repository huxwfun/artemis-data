import createActions from './createActions'
import createReducer from './createReducer'
import createSelectors from './createSelectors'
import createActionTypes from './createActionTypes'

export default storeKey => {
  const actionTypes = createActionTypes(storeKey)
  const actions = createActions(actionTypes)
  const reducer = createReducer(actionTypes)
  const selectors = createSelectors(storeKey)
  return {
    actionTypes,
    actions,
    reducer,
    selectors
  }
}
