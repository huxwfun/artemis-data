export default storeKey => {
  const selector = state => state[storeKey]
  return {
    request: (state, key) => selector(state).requests[key] || null,
    entities: state => selector(state).entities
  }
}
