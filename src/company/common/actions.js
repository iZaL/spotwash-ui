export const ACTION_TYPES = {
  FETCH_WORKING_ORDERS_REQUEST: '@company/FETCH_WORKING_ORDERS_REQUEST',
  FETCH_WORKING_ORDERS_SUCCESS: '@company/FETCH_WORKING_ORDERS_SUCCESS',
  FETCH_WORKING_ORDERS_FAILURE: '@company/FETCH_WORKING_ORDERS_FAILURE',
  FETCH_WORKING_ORDERS_REFRESH_REQUEST:
    '@company/FETCH_WORKING_ORDERS_REFRESH_REQUEST',

  FETCH_UPCOMING_ORDERS_REQUEST: '@company/FETCH_UPCOMING_ORDERS_REQUEST',
  FETCH_UPCOMING_ORDERS_SUCCESS: '@company/FETCH_UPCOMING_ORDERS_SUCCESS',
  FETCH_UPCOMING_ORDERS_FAILURE: '@company/FETCH_UPCOMING_ORDERS_FAILURE',

  FETCH_UPCOMING_ORDERS_REFRESH_REQUEST:
    '@company/FETCH_WORKING_ORDERS_REFRESH_REQUEST',

  FETCH_PAST_ORDERS_REQUEST: '@company/FETCH_PAST_ORDERS_REQUEST',
  FETCH_PAST_ORDERS_SUCCESS: '@company/FETCH_PAST_ORDERS_SUCCESS',
  FETCH_PAST_ORDERS_FAILURE: '@company/FETCH_PAST_ORDERS_FAILURE',
  FETCH_PAST_ORDERS_REFRESH_REQUEST:
    '@company/FETCH_PAST_ORDERS_REFRESH_REQUEST',

  FETCH_ORDER_DETAILS_REQUEST: '@company/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@company/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@company/FETCH_ORDER_DETAILS_FAILURE',

  FETCH_DRIVERS_REQUEST: '@company/drivers/FETCH_DRIVERS_REQUEST',
  FETCH_DRIVERS_SUCCESS: '@company/drivers/FETCH_DRIVERS_SUCCESS',
  FETCH_DRIVERS_FAILURE: '@company/drivers/FETCH_DRIVERS_FAILURE',

  FETCH_DRIVER_REQUEST: '@company/drivers/FETCH_DRIVER_REQUEST',
  FETCH_DRIVER_SUCCESS: '@company/drivers/FETCH_DRIVER_SUCCESS',
  FETCH_DRIVER_FAILURE: '@company/drivers/FETCH_DRIVER_FAILURE',

  FETCH_TIMINGS_REQUEST: '@company/drivers/FETCH_TIMINGS_REQUEST',
  FETCH_TIMINGS_SUCCESS: '@company/drivers/FETCH_TIMINGS_SUCCESS',
  FETCH_TIMINGS_FAILURE: '@company/drivers/FETCH_TIMINGS_FAILURE',

  FETCH_PACKAGES_REQUEST: '@company/drivers/FETCH_PACKAGES_REQUEST',
  FETCH_PACKAGES_SUCCESS: '@company/drivers/FETCH_PACKAGES_SUCCESS',
  FETCH_PACKAGES_FAILURE: '@company/drivers/FETCH_PACKAGES_FAILURE',

  FETCH_PENDING_BIDS_REQUEST: '@company/bids/FETCH_PENDING_BIDS_REQUEST',
  FETCH_PENDING_BIDS_SUCCESS: '@company/bids/FETCH_PENDING_BIDS_SUCCESS',
  FETCH_PENDING_BIDS_FAILURE: '@company/bids/FETCH_PENDING_BIDS_FAILURE',

  FETCH_CONFIRMED_BIDS_REQUEST: '@company/bids/FETCH_CONFIRMED_BIDS_REQUEST',
  FETCH_CONFIRMED_BIDS_SUCCESS: '@company/bids/FETCH_CONFIRMED_BIDS_SUCCESS',
  FETCH_CONFIRMED_BIDS_FAILURE: '@company/bids/FETCH_CONFIRMED_BIDS_FAILURE',

  ASSIGN_DRIVER_REQUEST: '@company/drivers/ASSIGN_DRIVER_REQUEST',
  ASSIGN_DRIVER_SUCCESS: '@company/drivers/ASSIGN_DRIVER_SUCCESS',
  ASSIGN_DRIVER_FAILURE: '@company/drivers/ASSIGN_DRIVER_FAILURE',

  SAVE_DRIVER_ATTRIBUTES_REQUEST:
    '@company/drivers/SAVE_DRIVER_ATTRIBUTES_REQUEST',
  SAVE_DRIVER_ATTRIBUTES_FAILURE:
    '@company/drivers/SAVE_DRIVER_ATTRIBUTES_FAILURE',
  SAVE_DRIVER_ATTRIBUTES_SUCCESS:
    '@company/drivers/SAVE_DRIVER_ATTRIBUTES_SUCCESS',

  SUBSCRIBE_TO_DRIVER_TRACKINGS: '@company/SUBSCRIBE_TO_DRIVER_TRACKINGS',

  DRIVER_SET_TIMINGS_REQUEST: '@company/DRIVER_SET_TIMINGS_REQUEST',

  MAKE_BID_REQUEST: '@company/orders/MAKE_BID_REQUEST',
  MAKE_BID_SUCCESS: '@company/orders/MAKE_BID_SUCCESS',
  MAKE_BID_FAILURE: '@company/orders/MAKE_BID_FAILURE',
};

function fetchUpcomingOrders(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    params,
  };
}

function fetchUpcomingOrdersRefresh(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchWorkingOrders(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_WORKING_ORDERS_REQUEST,
    params,
  };
}

function fetchWorkingOrdersRefresh(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_WORKING_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchPastOrders(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_PAST_ORDERS_REQUEST,
    params,
  };
}

function fetchPastOrdersRefresh(params = {}) {
  return {
    type: ACTION_TYPES.FETCH_PAST_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchOrderDetails(id) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    order_id: id,
  };
}

function fetchDriver(id) {
  return {
    type: ACTION_TYPES.FETCH_DRIVER_REQUEST,
    driver_id: id,
  };
}

function fetchDrivers(params) {
  return {
    type: ACTION_TYPES.FETCH_DRIVERS_REQUEST,
    params,
  };
}
function fetchPackages(params) {
  return {
    type: ACTION_TYPES.FETCH_PACKAGES_REQUEST,
    params,
  };
}

function fetchPendingBids(params) {
  return {
    type: ACTION_TYPES.FETCH_PENDING_BIDS_REQUEST,
    params,
  };
}

function fetchConfirmedBids(params) {
  return {
    type: ACTION_TYPES.FETCH_CONFIRMED_BIDS_REQUEST,
    params,
  };
}

function fetchTimings(params) {
  return {
    type: ACTION_TYPES.FETCH_TIMINGS_REQUEST,
    params,
  };
}

function assignDriver(id, params) {
  return {
    type: ACTION_TYPES.ASSIGN_DRIVER_REQUEST,
    order_id: id,
    params,
  };
}

function setTimings(params) {
  return {
    type: ACTION_TYPES.DRIVER_SET_TIMINGS_REQUEST,
    params,
  };
}

function saveDriverAttributes(params: object) {
  return {
    type: ACTION_TYPES.SAVE_DRIVER_ATTRIBUTES_REQUEST,
    params,
  };
}

function subscribeToDriverTrackings() {
  return {
    type: ACTION_TYPES.SUBSCRIBE_TO_DRIVER_TRACKINGS,
  };
}

function makeBid(params) {
  return {
    type: ACTION_TYPES.MAKE_BID_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchWorkingOrders,
  fetchWorkingOrdersRefresh,
  fetchUpcomingOrders,
  fetchUpcomingOrdersRefresh,
  fetchPastOrders,
  fetchPastOrdersRefresh,
  fetchOrderDetails,
  fetchDrivers,
  fetchPackages,
  fetchPendingBids,
  fetchConfirmedBids,
  fetchTimings,
  fetchDriver,
  assignDriver,
  saveDriverAttributes,
  subscribeToDriverTrackings,
  makeBid,
};
