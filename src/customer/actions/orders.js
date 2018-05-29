export const ACTION_TYPES = {
  CATEGORY_REQUEST: '@customer/orders/CATEGORY_REQUEST',
  CATEGORY_SUCCESS: '@customer/orders/CATEGORY_SUCCESS',
  CATEGORY_FAILURE: '@customer/orders/CATEGORY_FAILURE',

  TIMINGS_REQUEST: '@customer/orders/TIMINGS_REQUEST',
  TIMINGS_SUCCESS: '@customer/orders/TIMINGS_SUCCESS',
  TIMINGS_FAILURE: '@customer/orders/TIMINGS_FAILURE',

  ADDRESSES_REQUEST: '@customer/orders/ADDRESSES_REQUEST',
  ADDRESSES_SUCCESS: '@customer/orders/ADDRESSES_SUCCESS',
  ADDRESSES_FAILURE: '@customer/orders/ADDRESSES_FAILURE',

  SAVE_ADDRESS_REQUEST: '@customer/orders/SAVE_ADDRESS_REQUEST',
  SAVE_ADDRESS_SUCCESS: '@customer/orders/SAVE_ADDRESS_SUCCESS',
  SAVE_ADDRESS_FAILURE: '@customer/orders/SAVE_ADDRESS_FAILURE',

  SAVE_ORDER_REQUEST: '@customer/orders/SAVE_ORDER_REQUEST',
  SAVE_ORDER_SUCCESS: '@customer/orders/SAVE_ORDER_SUCCESS',
  SAVE_ORDER_FAILURE: '@customer/orders/SAVE_ORDER_FAILURE',

  STANDING_ORDERS_REQUEST: '@customer/orders/STANDING_ORDERS_REQUEST',
  STANDING_ORDERS_SUCCESS: '@customer/orders/STANDING_ORDERS_SUCCESS',
  STANDING_ORDERS_FAILURE: '@customer/orders/STANDING_ORDERS_FAILURE',

  FETCH_BIDS_REQUEST: '@customer/orders/FETCH_BIDS_REQUEST',
  FETCH_BIDS_SUCCESS: '@customer/orders/FETCH_BIDS_SUCCESS',
  FETCH_BIDS_FAILURE: '@customer/orders/FETCH_BIDS_FAILURE',

  CONFIRM_BID_REQUEST: '@customer/orders/CONFIRM_BID_REQUEST',
  CONFIRM_BID_SUCCESS: '@customer/orders/CONFIRM_BID_SUCCESS',
  CONFIRM_BID_FAILURE: '@customer/orders/CONFIRM_BID_FAILURE',

  ORDER_SET_FIELD: '@customer/orders/ORDER_SET_FIELD',
};

function fetchCategories(params) {
  return {
    type: ACTION_TYPES.CATEGORY_REQUEST,
    params,
  };
}

function fetchStandingOrders(params) {
  return {
    type: ACTION_TYPES.STANDING_ORDERS_REQUEST,
    params,
  };
}

function fetchTimings(params) {
  return {
    type: ACTION_TYPES.TIMINGS_REQUEST,
    params,
  };
}

function saveOrder(params) {
  return {
    type: ACTION_TYPES.SAVE_ORDER_REQUEST,
    params,
  };
}

function fetchAddresses(params) {
  return {
    type: ACTION_TYPES.ADDRESSES_REQUEST,
    params,
  };
}

function saveAddress(address: object) {
  return {
    type: ACTION_TYPES.SAVE_ADDRESS_REQUEST,
    address,
  };
}

function fetchBids(params: object) {
  return {
    type: ACTION_TYPES.FETCH_BIDS_REQUEST,
    params,
  };
}

function confirmBid(params: object) {
  return {
    type: ACTION_TYPES.CONFIRM_BID_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchCategories,
  fetchTimings,
  fetchAddresses,
  saveAddress,
  saveOrder,
  fetchStandingOrders,
  fetchBids,
  confirmBid,
};
