import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES as ORDER_ACTION_TYPES} from 'company/actions/orders';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

function* fetchStandingOrders() {
  try {
    const response = yield call(API.fetchStandingOrders);
    const normalizedOrders = normalize(response.data, [Schema.orders]);
    const normalizedCompany = normalize(response.company, Schema.companies);
    const orderIds = Object.keys(normalizedOrders.entities.orders) || [];

    yield put({
      type: ORDER_ACTION_TYPES.STANDING_ORDERS_SUCCESS,
      entities: {
        ...normalizedOrders.entities,
        ...normalizedCompany.entities,
      },
      orderIds
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.STANDING_ORDERS_FAILURE, error});
  }
}

function* makeBid(action) {
  try {
    const response = yield call(API.makeBid, action.params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ORDER_ACTION_TYPES.MAKE_BID_SUCCESS,
      entities:normalized.entities
    });

  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.MAKE_BID_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}


function* cancelBid(action) {
  try {
    const response = yield call(API.cancelBid, action.params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ORDER_ACTION_TYPES.CANCEL_BID_SUCCESS,
      entities:normalized.entities
    });

  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.CANCEL_BID_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* fetchBidForOrder(action) {
  try {
    const response = yield call(API.fetchBidForOrder,action.params);
      const normalizedOrder = normalize(response.data, Schema.orders);
      const normalizedCompany = normalize(response.company, Schema.companies);
      yield put({
        type: ORDER_ACTION_TYPES.FETCH_ORDER_BID_SUCCESS,
        entities: {
          ...normalizedOrder.entities,
          ...normalizedCompany.entities,
        },
      });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_ORDER_BID_FAILURE, error});
  }
}

function* fetchStandingOrdersMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.STANDING_ORDERS_REQUEST,
    fetchStandingOrders,
  );
}

function* makeBidMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.MAKE_BID_REQUEST, makeBid);
}

function* cancelBidMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.CANCEL_BID_REQUEST, cancelBid);
}

function* fetchBidForOrderMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.FETCH_ORDER_BID_REQUEST, fetchBidForOrder);
}


export const sagas = all([
  fork(fetchStandingOrdersMonitor),
  fork(makeBidMonitor),
  fork(cancelBidMonitor),
  fork(fetchBidForOrderMonitor)
]);
