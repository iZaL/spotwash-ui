import {sagas as APP_SAGA} from 'app/sagas';
import {sagas as CUSTOMER_SAGA} from 'customer/common/sagas';
import {sagas as AUTH_SAGA} from 'guest/common/sagas';
import {sagas as COMPANY_SAGAS} from 'company/sagas';

import {all} from 'redux-saga/effects';

export function* rootSaga() {
  yield all([APP_SAGA, AUTH_SAGA, CUSTOMER_SAGA, COMPANY_SAGAS]);
}
