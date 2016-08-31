import { getLinkedinAccessToken, linkAPI, fields, authUrl } from './service';

// Methods
const getLinkedinUrl = () => authUrl;

const getLinkedinData = () => {
  const linkedinAccessToken = getLinkedinAccessToken();
  const output = HTTP.get(`${linkAPI}people/~:(${fields})?format=json`, {
    headers: {
      Authorization: `Bearer ${linkedinAccessToken}`,
    },
  }).data;

  return output;
};

// Publish
Meteor.methods({
  getLinkedinUrl,
  getLinkedinData,
});
