import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'company/common/actions';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';
import {ACTIONS as APP_ACTIONS} from "../../app/common/actions";

function* fetchPendingBids(action) {
  try {
    const response = yield call(API.fetchPendingBids);

    const formattedResponse = {
      ...response.company,
      bids: {
        'pending': response.orders,
      },
    };

    const normalizedOrders = normalize(formattedResponse, Schema.companies);
    yield put({
      type: ACTION_TYPES.FETCH_PENDING_BIDS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PENDING_BIDS_FAILURE, error});
  }
}

function* fetchConfirmedBids(action) {
  try {
    const response = yield call(API.fetchConfirmedBids);

    const formattedResponse = {
      ...response.company,
      bids: {
        'confirmed': response.orders,
      },
    };

    const normalizedOrders = normalize(formattedResponse, Schema.companies);
    yield put({
      type: ACTION_TYPES.FETCH_CONFIRMED_BIDS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CONFIRMED_BIDS_FAILURE, error});
  }
}

function* makeBid(action) {
  try {

    const params = {
      body: action.params,
    };

    const response = yield call(API.makeBid, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.MAKE_BID_SUCCESS,
      entities:normalized.entities
    });

  } catch (error) {
    yield put({type: ACTION_TYPES.MAKE_BID_FAILURE, error});
    yield put(APP_ACTIONS.setNotification({
      message:error,
      type:'error'
    }));
  }
}

function* fetchPendingBidsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PENDING_BIDS_REQUEST, fetchPendingBids);
}
function* fetchConfirmedBidsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_CONFIRMED_BIDS_REQUEST, fetchConfirmedBids);
}

function* makeBidMonitor() {
  yield takeLatest(ACTION_TYPES.MAKE_BID_REQUEST, makeBid);
}

export const sagas = all([
  fork(fetchPendingBidsMonitor),
  fork(fetchConfirmedBidsMonitor),
  fork(makeBidMonitor),

]);
