import jsforce from 'jsforce';

const user = 'josegomes@thinkup.io';
const pass = '6QDVKbZ8FqaUgNg7V9GgxN011cNlmYrSGHzVQyCmRDKPAFGT';

export const conn = new jsforce.Connection();

Meteor.wrapAsync(conn.login, conn)(user, pass);
