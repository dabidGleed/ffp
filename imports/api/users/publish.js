Meteor.publish('users', () => {
  const output = Meteor.users.find({}, {
    fields: {
      emails: 1,
      profile: 1,
    },
  });

  return output;
});
