import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  company => {
    return {
      ...company,
    };
  },
);

export const SELECTORS = {
  getProfile,
};
