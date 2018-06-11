import {schema} from 'normalizr';
const categoriesSchema = new schema.Entity('categories');
const packagesSchema = new schema.Entity('packages');
const timingsSchema = new schema.Entity('timings');
const ordersSchema = new schema.Entity('orders');
const usersSchema = new schema.Entity('users');
const driversSchema = new schema.Entity('drivers');
// const jobsSchema = new schema.Entity('jobs');
const areasSchema = new schema.Entity('areas');

const profileSchema = new schema.Union(
  {
    drivers: driversSchema,
  },
  input => input.schema,
);

categoriesSchema.define({
  children: [categoriesSchema],
  packages: [packagesSchema],
});

packagesSchema.define({
  // category: categoriesSchema,
});

ordersSchema.define({
  user: usersSchema,
  // job: jobsSchema,
  packages: [packagesSchema],
});

// jobsSchema.define({
//   driver: driversSchema,
// });

usersSchema.define({
  orders: [ordersSchema],
  profile: profileSchema,
});

driversSchema.define({
  user: usersSchema,
  working_order: ordersSchema,
  past_orders: [ordersSchema],
  upcoming_orders: [ordersSchema],
});

// packagesSchema.define({
//   category:categoriesSchema
// });

export const Schema = {
  categories: categoriesSchema,
  packages: packagesSchema,
  timings: timingsSchema,
  orders: ordersSchema,
  users: usersSchema,
  drivers: driversSchema,
  areas: areasSchema,
};
