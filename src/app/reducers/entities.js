import merge from 'lodash/merge';

export function reducer(
  state = {
    users: {},
    categories: {},
    packages: {},
    services: {},
    timings: {},
    // addresses: {},
    drivers: {},
    jobs: {},
    areas: {},
    orders: {},
  },
  action = {},
) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
