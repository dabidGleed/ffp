import { getGoogleAccessToken, googleAPI, authUrl } from './service';

// Methods
const getGoogleUrl = () => authUrl;

const getGoogleData = () => {
  const googleAccessToken = getGoogleAccessToken();
  const output = HTTP.get(googleAPI, {
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  }).data;

  return output;
};

// Publish
Meteor.methods({
  getGoogleUrl,
  getGoogleData,
});
