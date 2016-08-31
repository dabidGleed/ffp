// Globals
let facebookAccessToken = '';

const cId = '1613318162316423';
const secret = '29385452a89205fc5b6c7aa064d9d87e';
const base = 'https://graph.facebook.com/v2.3';
const facebookAPI = `${base}/oauth`;
const callUri = 'http://localhost:3000/facebook/callback';
const facebookAuth = 'https://www.facebook.com/dialog/oauth';


// Helpers
const makeauthUrl = () => {
  const output = [
    facebookAuth,
    '?client_id=',
    cId,
    '&redirect_uri=',
    callUri,
    '&scope=email,public_profile,user_birthday,user_education_history',
    '&state=',
  ];

  return output.join('');
};

const makeAccTokenUrl = (arg) => {
  const output = [
    facebookAPI,
    '/access_token?',
    '&client_id=',
    cId,
    '&redirect_uri=',
    callUri,
    '&client_secret=',
    secret,
    '&code=',
    arg,
  ];

  return output.join('');
};

const makeGraphUrl = () => {
  const output = [
    base,
    '/me?fields=birthday,email,education,first_name,gender,last_name,picture',
  ];

  return output.join('');
};


// Exports
export const getFacebookAccessToken = () => facebookAccessToken;

export const authUrl = makeauthUrl();
export const graphUri = makeGraphUrl();


// The route
Picker.route('/facebook/callback', (params, req, res) => {
  HTTP.call('GET', `${makeAccTokenUrl(params.query.code)}`, (err, result) => {
    facebookAccessToken = result.data.access_token;

    const parameters = params.query.state.split('_');

    if (parameters[0] === 'alumni' && parameters[1] === 'member') {
      res.writeHead(302, { Location: '/register/steps?type=facebook' });
    } else if (parameters[0] === 'alumni') {
      res.writeHead(302, { Location: '/register/nonmember?type=facebook' });
    } else {
      res.writeHead(302, { Location: '/register/student?type=facebook' });
    }

    res.end();
  });
});
