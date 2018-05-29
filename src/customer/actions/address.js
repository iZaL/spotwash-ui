export const ACTION_TYPES = {
  FETCH_ADDRESSES_REQUEST: '@customer/orders/FETCH_ADDRESSES_REQUEST',
  FETCH_ADDRESSES_SUCCESS: '@customer/orders/FETCH_ADDRESSES_SUCCESS',
  FETCH_ADDRESSES_FAILURE: '@customer/orders/FETCH_ADDRESSES_FAILURE',

  SAVE_ADDRESS_REQUEST: '@customer/orders/SAVE_ADDRESS_REQUEST',
  SAVE_ADDRESS_SUCCESS: '@customer/orders/SAVE_ADDRESS_SUCCESS',
  SAVE_ADDRESS_FAILURE: '@customer/orders/SAVE_ADDRESS_FAILURE',

  STANDING_ORDERS_REQUEST: '@customer/address/STANDING_ORDERS_REQUEST',
};

function fetchStandingOrders(params) {
  return {
    type: ACTION_TYPES.STANDING_ORDERS_REQUEST,
    params,
  };
}

function fetchAddresses(params) {
  return {
    type: ACTION_TYPES.FETCH_ADDRESSES_REQUEST,
    params,
  };
}

function saveAddress(address: object) {
  return {
    type: ACTION_TYPES.SAVE_ADDRESS_REQUEST,
    address,
  };
}

export const ACTIONS = {
  fetchAddresses,
  saveAddress,
  fetchStandingOrders,
};
