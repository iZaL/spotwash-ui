import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const isAuthenticated = state => state.user.isAuthenticated;
const getCurrentUserID = state => state.user.id;

const getCurrentUser = createSelector(
  [schemas, getCurrentUserID],
  (entities, user) => {
    return  denormalize(user, Schema.users, entities)
  },
);

const getUserCompany = createSelector(
  [schemas, getCurrentUser],
  (entities, user) => {
    return  denormalize(1, Schema.companies, entities)
  },
);

export const SELECTORS = {
  isAuthenticated,
  getCurrentUser,
  getUserCompany
};
