export const createEntitiesShapeFromTypes = types => {
  const result = {}
  types.forEach(s => (result[s] = {}))
  return result
}

export const mergeEntities = (entities, newEntities) => {
  const result = {}
  Object.keys({ ...entities, ...newEntities }).forEach(key => {
    if (!newEntities[key]) {
      result[key] = entities[key]
    }
    result[key] = {
      ...(entities[key] || {}),
      ...newEntities[key]
    }
  })
  return result
}

export const updateEntities = (entities, patches) => {
  const result = {}
  Object.keys(patches)
    .filter(key => !!entities[key])
    .forEach(key => {
      const patchesForType = patches[key]
      const entitiesOfType = entities[key]
      const newEntitiesOfType = {}
      Object.keys(patchesForType).filter(id => !!entitiesOfType[id]).forEach(id => {
        newEntitiesOfType[id] = {
          ...entitiesOfType[id],
          ...patchesForType[id]
        }
      })
      result[key] = newEntitiesOfType
    })
  return result
}

export const removeEntities = (entities, key, ids = []) => {
  const strIds = ids.map(i => i.toString())
  const type = {}
  Object.keys(entities[key] || {}).forEach(id => {
    if (strIds.indexOf(id) < 0) {
      type[id] = entities[key][id]
    }
  })
  return {
    ...entities,
    [key]: type
  }
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
// export function warning (message) {
//   if (typeof console !== 'undefined' && typeof console.error === 'function') {
//     console.error(message)
//   }
//   try {
//     // This error was thrown as a convenience so that if you enable
//     // "break on all exceptions" in your console,
//     // it would pause the execution at this line.
//     throw new Error(message)
//   } catch (e) {} // eslint-disable-line no-empty
// }
