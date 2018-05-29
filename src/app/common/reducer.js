import {ACTION_TYPES} from 'app/common/actions';
import merge from 'lodash/merge';

const appInitialState = {
  installed: false,
  booted: false,
  notifications: {
    message: null,
    messageType: null,
  },
  language: 'ar',
};

export function reducer(state = appInitialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.INSTALL_SUCCESS:
      return {...state, installed: true};
    case ACTION_TYPES.BOOT_REQUEST:
      return {...state, booted: false};
    case ACTION_TYPES.BOOT_SUCCESS:
      return {...state, booted: true};
    case ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          message: action.payload.message,
          messageType: action.payload.messageType,
        },
      };
    case ACTION_TYPES.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          message: null,
          type: null,
        },
      };
    case ACTION_TYPES.SET_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.language,
      };

    default:
      return state;
  }
}

const entitiesInitialState = {
  users: {},
  categories: {},
  timings: {},
  orders: {},
  companies: {},
};

export function entities(state = entitiesInitialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  return state;
}
