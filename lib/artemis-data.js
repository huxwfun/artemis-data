'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var redux = require('redux');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var createActions = ((_ref) => {
  let ADD_ENTITIES = _ref.ADD_ENTITIES,
      UPDATE_ENTITIES = _ref.UPDATE_ENTITIES,
      REMOVE_ENTITIES = _ref.REMOVE_ENTITIES,
      SET_REQUEST = _ref.SET_REQUEST;
  return {
    setRequest: function setRequest(key) {
      let state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return {
        type: SET_REQUEST,
        payload: _objectSpread({
          key
        }, state)
      };
    },
    addEntities: entities => ({
      type: ADD_ENTITIES,
      payload: entities
    }),
    updateEntities: patches => ({
      type: UPDATE_ENTITIES,
      payload: patches
    }),
    removeEntities: (type, ids) => ({
      type: REMOVE_ENTITIES,
      payload: {
        type,
        ids
      }
    })
  };
});

const mergeEntities = (entities, newEntities) => {
  const result = {};
  Object.keys(_objectSpread({}, entities, newEntities)).forEach(key => {
    if (!newEntities[key]) {
      result[key] = entities[key];
    }

    result[key] = _objectSpread({}, entities[key] || {}, newEntities[key]);
  });
  return result;
};
const updateEntities = (entities, patches) => {
  const result = {};
  Object.keys(patches).filter(key => !!entities[key]).forEach(key => {
    const patchesForType = patches[key];
    const entitiesOfType = entities[key];
    const newEntitiesOfType = {};
    Object.keys(patchesForType).filter(id => !!entitiesOfType[id]).forEach(id => {
      newEntitiesOfType[id] = _objectSpread({}, entitiesOfType[id], patchesForType[id]);
    });
    result[key] = newEntitiesOfType;
  });
  return result;
};
const removeEntities = function removeEntities(entities, key) {
  let ids = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const strIds = ids.map(i => i.toString());
  const type = {};
  Object.keys(entities[key] || {}).forEach(id => {
    if (strIds.indexOf(id) < 0) {
      type[id] = entities[key][id];
    }
  });
  return _objectSpread({}, entities, {
    [key]: type
  });
};
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

const createRequestsReducer = SET_REQUEST => {
  return function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === SET_REQUEST) {
      const _action$payload = action.payload,
            key = _action$payload.key,
            nextState = _objectWithoutProperties(_action$payload, ["key"]);

      return _objectSpread({}, state, {
        [key]: nextState
      });
    }

    return state;
  };
};

const createEntitiesReducer = (ADD_ENTITIES, UPDATE_ENTITIES, REMOVE_ENTITIES) => function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ADD_ENTITIES:
      {
        const entities = action.payload;
        return mergeEntities(state, entities);
      }

    case UPDATE_ENTITIES:
      {
        const patches = action.payload;
        return updateEntities(state, patches);
      }

    case REMOVE_ENTITIES:
      {
        const _action$payload2 = action.payload,
              type = _action$payload2.type,
              ids = _action$payload2.ids;
        return removeEntities(state, type, ids);
      }

    default:
      return state;
  }
};

var createReducer = ((_ref) => {
  let SET_REQUEST = _ref.SET_REQUEST,
      ADD_ENTITIES = _ref.ADD_ENTITIES,
      UPDATE_ENTITIES = _ref.UPDATE_ENTITIES,
      REMOVE_ENTITIES = _ref.REMOVE_ENTITIES;
  return redux.combineReducers({
    requests: createRequestsReducer(SET_REQUEST),
    entities: createEntitiesReducer(ADD_ENTITIES, UPDATE_ENTITIES, REMOVE_ENTITIES)
  });
});

var createSelectors = (storeKey => {
  const selector = state => state[storeKey];

  return {
    request: (state, key) => selector(state).requests[key] || null,
    entities: state => selector(state).entities
  };
});

var createActionTypes = (storeKey => ({
  ADD_ENTITIES: `${storeKey}/add_entities`,
  UPDATE_ENTITIES: `${storeKey}/update_entities`,
  REMOVE_ENTITIES: `${storeKey}/remove_entities`,
  SET_REQUEST: `${storeKey}/set_request`
}));

var index = (storeKey => {
  const actionTypes = createActionTypes(storeKey);
  const actions = createActions(actionTypes);
  const reducer = createReducer(actionTypes);
  const selectors = createSelectors(storeKey);
  return {
    actionTypes,
    actions,
    reducer,
    selectors
  };
});

exports.createReduxBinding = index;
