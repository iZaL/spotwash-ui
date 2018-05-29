export const ACTION_TYPES = {
  STANDING_ORDERS_REQUEST: '@company/orders/STANDING_ORDERS_REQUEST',
  STANDING_ORDERS_SUCCESS: '@company/orders/STANDING_ORDERS_SUCCESS',
  STANDING_ORDERS_FAILURE: '@company/orders/STANDING_ORDERS_FAILURE',

  MAKE_BID_REQUEST: '@company/orders/MAKE_BID_REQUEST',
  MAKE_BID_SUCCESS: '@company/orders/MAKE_BID_SUCCESS',
  MAKE_BID_FAILURE: '@company/orders/MAKE_BID_FAILURE',

  CANCEL_BID_REQUEST: '@company/orders/CANCEL_BID_REQUEST',
  CANCEL_BID_SUCCESS: '@company/orders/CANCEL_BID_SUCCESS',
  CANCEL_BID_FAILURE: '@company/orders/CANCEL_BID_FAILURE',

  FETCH_ORDER_BID_REQUEST: '@company/orders/FETCH_ORDER_BID_REQUEST',
  FETCH_ORDER_BID_SUCCESS: '@company/orders/FETCH_ORDER_BID_SUCCESS',
  FETCH_ORDER_BID_FAILURE: '@company/orders/FETCH_ORDER_BID_FAILURE',
};

function fetchStandingOrders(params) {
  return {
    type: ACTION_TYPES.STANDING_ORDERS_REQUEST,
    params,
  };
}
function makeBid(params) {
  return {
    type: ACTION_TYPES.MAKE_BID_REQUEST,
    params,
  };
}

function cancelBid(params) {
  return {
    type: ACTION_TYPES.CANCEL_BID_REQUEST,
    params,
  };
}
function fetchBidForOrder(params) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_BID_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchStandingOrders,
  makeBid,
  cancelBid,
  fetchBidForOrder
};
