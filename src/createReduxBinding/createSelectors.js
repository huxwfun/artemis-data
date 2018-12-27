export default storeKey => {
  const selector = state => state[storeKey]
  return {
    request: (key, state) => selector(state).requests[key] || null,
    entities: state => selector(state).entities
  }
}
