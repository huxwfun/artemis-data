import createReduxBinding from '../../src/createReduxBinding'

export const storeKey = 'test'

const { actionTypes, actions, reducer, selectors } = createReduxBinding(
  storeKey
)

export { actionTypes, actions, reducer, selectors }
