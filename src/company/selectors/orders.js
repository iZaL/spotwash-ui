import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';
import {SELECTORS as PROFILE_SELECTOR} from 'company/selectors/profile';

const schemas = state => state.entities;
const upcomingOrders = state => state.company.upcoming_orders.ids;
const workingOrders = state => state.company.working_orders.ids;
const pastOrders = state => state.company.past_orders.ids;
const getItemIdProp = (state, itemID) => itemID;
const timingsEntity = state => state.entities.timings;

const getOrderByID = () => {
  return createSelector(
    [schemas, getItemIdProp],
    (entities, itemID) => denormalize(itemID, Schema.orders, entities),
  );
};

const getUpcomingOrders = createSelector(
  [schemas, upcomingOrders],
  (entities, orders) => {
    return (
      (orders &&
        orders
          .map(orderId => denormalize(orderId, Schema.orders, entities))
          .filter(order => !order.is_working)) ||
      []
    );
  },
);

const getWorkingOrders = createSelector(
  [schemas, workingOrders],
  (entities, orders) => {
    return (
      (orders &&
        orders.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
      []
    );
  },
);

const getPastOrders = createSelector(
  [schemas, pastOrders],
  (entities, orders) => {
    return (
      (orders &&
        orders.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
      []
    );
  },
);

const getTimings = createSelector(
  [timingsEntity],
  timings => {
    return Object.keys(timings).map(timing => timings[timing]);
  },
);

const getPendingBids = createSelector(
  [PROFILE_SELECTOR.getProfile, schemas],
  (company, entities) => {
    let bids = (company.bids && company.bids.pending) || [];
    return (
      bids.map(orderId => denormalize(orderId, Schema.orders, entities)) || []
    );
  },
);

const getConfirmedBids = createSelector(
  [PROFILE_SELECTOR.getProfile, schemas],
  (company, entities) => {
    let bids = (company.bids && company.bids.confirmed) || [];
    return (
      bids.map(orderId => denormalize(orderId, Schema.orders, entities)) || []
    );
  },
);

const getPackages = createSelector(
  [PROFILE_SELECTOR.getProfile, schemas],
  (company, entities) => {
    let packages = company.packages || [];
    return (
      packages.map(orderId =>
        denormalize(orderId, Schema.packages, entities),
      ) || []
    );
  },
);

export const SELECTORS = {
  getUpcomingOrders,
  getWorkingOrders,
  getPastOrders,
  getOrderByID,
  getTimings,
  getPendingBids,
  getConfirmedBids,
  getPackages,
};
