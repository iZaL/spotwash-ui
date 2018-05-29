import {schema} from 'normalizr';
const categoriesSchema = new schema.Entity('categories');
const packagesSchema = new schema.Entity('packages');
const timingsSchema = new schema.Entity('timings');
const ordersSchema = new schema.Entity('orders');
const usersSchema = new schema.Entity('users');
const bidsSchema = new schema.Entity('bids');
const companiesSchema = new schema.Entity('companies');
const driversSchema = new schema.Entity('drivers');
const addressesSchema = new schema.Entity('addresses');
const jobsSchema = new schema.Entity('jobs');

// const driverOrCompany = new schema.Array({
//   drivers: driversSchema,
//   companies: companiesSchema
// }, (entity) => entity.type);

categoriesSchema.define({
  children: [categoriesSchema],
  packages: [packagesSchema],
});

ordersSchema.define({
  user: usersSchema,
  category: categoriesSchema,
  time: timingsSchema,
  address: addressesSchema,
  packages: [packagesSchema],
  bids: [bidsSchema],
  accepted_bid:bidsSchema,
  accepted_job:jobsSchema,
  jobs:[jobsSchema],
  company:companiesSchema,
});

usersSchema.define({
  orders: [ordersSchema],
  // profile: driverOrCompany
});

bidsSchema.define({
  company: companiesSchema,
  order: ordersSchema,
});

companiesSchema.define({
  user: usersSchema,
  packages:[packagesSchema],
  drivers:[driversSchema]
});

driversSchema.define({
  user: usersSchema,
  company: companiesSchema,
});

packagesSchema.define({
  category:categoriesSchema
});

export const Schema = {
  categories: categoriesSchema,
  timings: timingsSchema,
  orders: ordersSchema,
  users: usersSchema,
  companies:companiesSchema
};
