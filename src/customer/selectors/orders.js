import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const getStandingOrderIds = state => state.customer.orders.standingOrderIds;

const getItemIdProp = ({}, itemID) => itemID;
const getOrderIdProps = ({}, props) => props.orderID;
const getBidIdProp = ({}, props) => props.bidID;

const denormalizeOrder = (itemID, entities) =>
  denormalize(itemID, Schema.orders, entities);

// const denormalizeBid = (itemID, entities) =>
//   denormalize(itemID, Schema.bids, entities);

const getOrders = createSelector(
  [schemas, getStandingOrderIds],
  (entities, orders) => {
    return (
      (orders && orders.map(orderId => denormalizeOrder(orderId, entities))) ||
      []
    );
  },
);

const getBidsByID = () => {
  return createSelector([schemas,getOrderIdProps, getBidIdProp], (entities,orderID, bidID) => {
      let order =  denormalize(orderID, Schema.orders, entities);
      return order.bids.find(bid => bid.id === bidID);
    }
  );
};

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalizeOrder(itemID, entities),
  );
};

export const SELECTORS = {
  getOrders,
  getOrderByID,
  getBidsByID,
};
