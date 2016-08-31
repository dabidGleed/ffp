export const Lookups = new Mongo.Collection('lookups');

Lookups.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
