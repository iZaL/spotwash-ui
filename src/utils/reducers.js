import {reducer as app, entities} from 'app/common/reducer';
import {reducer as user} from 'guest/common/reducer';
import {reducer as customer} from 'customer/reducers';
import {reducer as company} from 'company/reducers';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  app,
  user,
  customer,
  company,
  entities,
});

export default rootReducer;