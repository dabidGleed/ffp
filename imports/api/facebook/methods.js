import { getFacebookAccessToken, authUrl, graphUri } from './service';

// Methods
const getFacebookUrl = () => authUrl;

const getFacebookData = () => {
  const facebookAccessToken = getFacebookAccessToken();
  const output = HTTP.get(graphUri, {
    headers: {
      Authorization: `Bearer ${facebookAccessToken}`,
    },
  }).data;

  return output;
};

// Publish
Meteor.methods({
  getFacebookUrl,
  getFacebookData,
});
