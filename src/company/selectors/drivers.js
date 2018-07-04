import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';
import {SELECTORS as PROFILE_SELECTOR} from 'company/selectors/profile';

const schemas = state => state.entities;
const driversSchema = state => state.entities.drivers;
const usersSchema = state => state.entities.users;
const getTrackings = state => state.company.trackings;

const getItemIdProp = (state, itemID) => itemID;

const getDriverByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.drivers, entities),
  );
};

// const getDrivers = createSelector(
//   [schemas, driversSchema, usersSchema],
//   (entities, drivers, usersSchema) =>
//     Object.keys(drivers).map(driverID => {
//       let driver = drivers[driverID];
//       return {
//         ...driver,
//         user: usersSchema[driver.user] || {},
//       };
//     }),
// );

const getDriverTrackings = createSelector(
  [schemas, driversSchema, getTrackings],
  (entities, drivers, trackings) =>
    Object.keys(trackings).map(driverID => {
      let driver = drivers[driverID];
      return {
        ...driver,
        ...trackings[driverID],
      };
    }),
);

const getDrivers = createSelector(
  [PROFILE_SELECTOR.getProfile, schemas],
  (company, entities) => {
    let drivers = company.drivers || [];
    return (
      drivers.map(driverID =>
        denormalize(driverID, Schema.drivers, entities),
      ) || []
    );
  },
);

export const SELECTORS = {
  getDrivers,
  getDriverByID,
  getDriverTrackings,
};
