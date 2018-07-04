import {sagas as orders} from 'company/sagas/orders';
import {sagas as drivers} from 'company/sagas/drivers';
import {sagas as bids} from 'company/sagas/bids';
import {all} from 'redux-saga/effects';

export const sagas = all([orders, drivers, bids]);
