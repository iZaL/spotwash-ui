import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES as ORDER_ACTION_TYPES} from 'customer/actions/orders';
import {ACTION_TYPES as ADDRESS_ACTION_TYPES} from 'customer/actions/address';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* fetchCategories() {
  try {
    const response = yield call(API.fetchCategories);
    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ORDER_ACTION_TYPES.CATEGORY_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.CATEGORY_FAILURE, error});
  }
}

function* fetchTimings() {
  try {
    const response = yield call(API.fetchTimings);
    const normalized = normalize(response.data, [Schema.timings]);
    yield put({
      type: ORDER_ACTION_TYPES.TIMINGS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.TIMINGS_FAILURE, error});
  }
}

function* fetchStandingOrders() {
  try {
    const response = yield call(API.fetchStandingOrders);
    const normalized = normalize(response.data, Schema.users);
    let {entities} = normalized;
    let orderIds = entities.orders ? Object.keys(entities.orders) : [];

    yield put({
      type: ORDER_ACTION_TYPES.STANDING_ORDERS_SUCCESS,
      entities: entities,
      orderIds,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.STANDING_ORDERS_FAILURE, error});
  }
}

function* saveOrder(action) {
  try {
    const response = yield call(API.saveOrder, action.params);
    const normalized = normalize(response.data, Schema.users);
    let {entities} = normalized;
    let orderIds = entities.orders ? Object.keys(entities.orders) : [];

    yield put({
      type: ORDER_ACTION_TYPES.SAVE_ORDER_SUCCESS,
      entities: entities,
      orderIds: orderIds,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.SAVE_ORDER_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* fetchBids(action) {
  try {
    const response = yield call(API.fetchBids, action.params.order_id);
    const normalized = normalize(response.data, Schema.orders);
    yield put({
      type: ORDER_ACTION_TYPES.FETCH_BIDS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_BIDS_FAILURE, error});
  }
}

function* confirmBid(action) {
  try {
    const response = yield call(API.confirmBid, action.params.bid_id, action.params);
    const normalized = normalize(response.data, Schema.orders);
    let {entities} = normalized;
    yield put({
      type: ORDER_ACTION_TYPES.CONFIRM_BID_SUCCESS,
      entities: entities,
    });
    yield put(APP_ACTIONS.setNotification(I18n.t('confirm_bid_success'), 'success'));
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.CONFIRM_BID_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* saveAddress(action) {
  try {
    const response = yield call(API.saveAddress, action.address);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ADDRESS_ACTION_TYPES.SAVE_ADDRESS_SUCCESS,
      entities: normalized.entities,
      address_id: response.address_id,
    });
    yield put(
      APP_ACTIONS.setNotification(I18n.t('address_save_success'), 'success'),
    );
  } catch (error) {
    yield put({type: ADDRESS_ACTION_TYPES.SAVE_ADDRESS_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification(I18n.t('address_save_failure'), 'error'),
    );
  }
}

function* fetchAddresses() {
  try {
    const response = yield call(API.fetchAddresses);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ADDRESS_ACTION_TYPES.FETCH_ADDRESSES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ADDRESS_ACTION_TYPES.FETCH_ADDRESSES_FAILURE, error});
  }
}
// Monitoring Sagas
function* fetchCategoriesMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.CATEGORY_REQUEST, fetchCategories);
}

function* fetchTimingsMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.TIMINGS_REQUEST, fetchTimings);
}

function* fetchStandingOrdersMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.STANDING_ORDERS_REQUEST,
    fetchStandingOrders,
  );
}

function* saveOrderMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.SAVE_ORDER_REQUEST, saveOrder);
}

function* fetchBidsMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.FETCH_BIDS_REQUEST, fetchBids);
}

function* confirmBidMonitor() {
  yield takeLatest(ORDER_ACTION_TYPES.CONFIRM_BID_REQUEST, confirmBid);
}

function* saveAddressMonitor() {
  yield takeLatest(ADDRESS_ACTION_TYPES.SAVE_ADDRESS_REQUEST, saveAddress);
}

function* fetchAddressesMonitor() {
  yield takeLatest(
    ADDRESS_ACTION_TYPES.FETCH_ADDRESSES_REQUEST,
    fetchAddresses,
  );
}

export const sagas = all([
  fork(fetchCategoriesMonitor),
  fork(fetchTimingsMonitor),
  fork(fetchStandingOrdersMonitor),
  fork(fetchAddressesMonitor),
  fork(saveAddressMonitor),
  fork(saveOrderMonitor),
  fork(fetchBidsMonitor),
  fork(confirmBidMonitor),
]);
