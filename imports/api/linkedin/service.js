// Globals
let linkedinAccessToken = '';

const secret = 'jTLZ5M9Dg1Cay50d';
const clientId = '77bs67zy6oi8in';
const linkUri = 'https://www.linkedin.com/oauth/v2/';
const callUri = 'http://localhost:3000/linkedin/callback';


// Helpers
const makeFields = () => {
  const output = [
    'lastName',
    'firstName',
    'positions',
    'educations',
    'maidenName',
    'pictureUrl',
    'emailAddress',
  ];

  return output.join(',');
};

const makeauthUrl = () => {
  const output = [
    linkUri,
    'authorization?response_type=code&scope=r_basicprofile%20r_emailaddress',
    '&client_id=',
    clientId,
    '&redirect_uri=',
    callUri,
    '&state=',
  ];

  return output.join('');
};


// Exports
export const getLinkedinAccessToken = () => linkedinAccessToken;

export const fields = makeFields();
export const authUrl = makeauthUrl();
export const linkAPI = 'https://api.linkedin.com/v1/';


// The route
Picker.route('/linkedin/callback', (params, req, res) => {
  const data = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      client_id: clientId,
      redirect_uri: callUri,
      client_secret: secret,
      code: params.query.code,
      grant_type: 'authorization_code',
    },
  };

  HTTP.call('POST', `${linkUri}accessToken`, data, (err, result) => {
    linkedinAccessToken = result.data.access_token;

    const parameters = params.query.state.split('_');

    if (parameters[0] === 'alumni' && parameters[1] === 'member') {
      res.writeHead(302, { Location: '/register/steps?type=linkedin' });
    } else if (parameters[0] === 'alumni') {
      res.writeHead(302, { Location: '/register/nonmember?type=linkedin' });
    } else {
      res.writeHead(302, { Location: '/register/student?type=linkedin' });
    }

    res.end();
  });
});
