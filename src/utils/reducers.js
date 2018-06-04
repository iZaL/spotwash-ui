import {reducer as app} from 'app/reducers/app';
import {reducer as entities} from 'app/reducers/entities';
import {reducer as notifications} from 'app/reducers/notifications';
import {reducer as user} from 'guest/common/reducer';
import {reducer as customer} from 'customer/reducers';
import {reducer as company} from 'company/reducers';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  app,
  entities,
  notifications,
  user,
  customer,
  company,
});

export default rootReducer;