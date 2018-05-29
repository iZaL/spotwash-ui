import {reducer as app} from 'app/common/reducer';
import {ACTION_TYPES} from 'app/common/actions';

const initialState = {
  installed: false,
  booted: false,
};

describe('App Component Store', () => {
  test('should return the initial state', () => {
    expect(app(initialState, {type: 'UNDEFINED'})).toEqual(initialState);
  });

  test('app bootstraps', () => {
    expect(app(initialState, {type: ACTION_TYPES.BOOT_SUCCESS})).toEqual({
      booted: true,
      installed: false,
      selectedCountry: 'Kuwait',
    });
  });
});
