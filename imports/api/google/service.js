// Globals
let googleAccessToken = '';

const secret = 'BU1COP07EYzu8bjsj2oU6aQY';
const cId = '752510958753-qa4s202o9amntg8346o2cglc8qoheni5.apps.googleusercontent.com';
const googleAuth = 'https://accounts.google.com/o/oauth2/v2/auth';
const googleUri = 'https://www.googleapis.com/oauth2/v4/token';
const callUri = 'http://localhost:3000/google/callback';


// Helpers
const makeauthUrl = () => {
  const output = [
    googleAuth,
    '?client_id=',
    cId,
    '&response_type=code',
    '&scope=openid%20email%20profile',
    '&redirect_uri=',
    callUri,
    '&state=',
  ];
  return output.join('');
};


// Exports
export const getGoogleAccessToken = () => googleAccessToken;

export const authUrl = makeauthUrl();
export const googleAPI = 'https://www.googleapis.com/oauth2/v3/userinfo';


// The route
Picker.route('/google/callback', (params, req, res) => {
  const data = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      client_id: cId,
      redirect_uri: callUri,
      client_secret: secret,
      code: params.query.code,
      grant_type: 'authorization_code',
    },
  };

  HTTP.call('POST', `${googleUri}`, data, (err, result) => {
    googleAccessToken = result.data.access_token;

    const parameters = params.query.state.split('_');

    if (parameters[0] === 'alumni' && parameters[1] === 'member') {
      res.writeHead(302, { Location: '/register/steps?type=google' });
    } else if (parameters[0] === 'alumni') {
      res.writeHead(302, { Location: '/register/nonmember?type=google' });
    } else {
      res.writeHead(302, { Location: '/register/student?type=google' });
    }

    res.end();
  });
});
