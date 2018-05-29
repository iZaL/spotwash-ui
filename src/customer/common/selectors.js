import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const categoriesEntity = state => state.entities.categories;
const timingsEntity = state => state.entities.timings;
const addressesEntity = state => state.entities.addresses;

const getCategories = createSelector(
  [schemas, categoriesEntity],
  (entities, categories) => {
    return map(categories, category =>
      denormalize(category.id, Schema.categories, entities),
    );
  },
);

const getParentCategories = createSelector([getCategories], categories => {
  return categories.filter(category => category.parent_id === null);
});

const getTimings = createSelector([timingsEntity], timings => {
  return Object.keys(timings).map(timing => timings[timing]);
});

const getAddresses = createSelector([addressesEntity], addresses => {
  return Object.keys(addresses).map(address => addresses[address]);
});

export const SELECTORS = {
  getCategories,
  getParentCategories,
  getTimings,
  getAddresses,
};
