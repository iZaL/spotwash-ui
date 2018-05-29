import {ACTION_TYPES, ACTIONS} from 'app/common/actions';

describe('App Component Actions', () => {
  test('returns expected action', () => {
    const expected = {
      type: ACTION_TYPES.BOOT_REQUEST,
    };

    const actual = ACTIONS.boot();
    expect(actual).toEqual(expected);
  });
});
