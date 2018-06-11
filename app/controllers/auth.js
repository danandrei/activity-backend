const passport = require('passport');
const nconf = require('nconf');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { ServerError } = require('../helpers/server_error');
const { checkParams } = require('../helpers/params');
const { usersService } = require('../services');

const secrets = nconf.get('secrets');
const JWT_SECRET = secrets.jwtSecret;
const GITLAB_SECRET = secrets.gitlabSecret;
const GITLAB_APP_ID = secrets.gitlabAppId;


async function gitlabToken (code) {

  if (!code) {
    throw new ServerError('Missing gitlab access code', 400);
  }

  // get accessToken from gitlab
  let response;
  try {
    const REQUEST_URL = 'https://gitlab.com/oauth/token?' +
                        '&client_id=' + GITLAB_APP_ID +
                        '&client_secret=' + GITLAB_SECRET +
                        '&code=' + code +
                        '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin' +
                        '&grant_type=authorization_code';

    response = await axios.post(REQUEST_URL);
  } catch (error) {
    console.error(error);
    throw new ServerError('Gitlab auth failed', 500);
  }

  const gitlabAccessToken = response.data.access_token;

  // get user
  try {
    response = await axios.get('https://gitlab.com/api/v4/user?access_token=' + gitlabAccessToken);
  } catch (error) {
    console.error(error);
    throw new ServerError('Gitlab user fetch failed', 500);
  }

  const user = await usersService.findOrCreate({ email: response.data.email }, {
    email: response.data.email,
    name: response.data.name,
    gitlab_id: response.data.id,
    profilePicture: response.data.avatar_url,
  });

  // generate token
  const secret = JWT_SECRET;
  const token = jwt.sign({
    userId: user._id,
    gitlabAccessToken: gitlabAccessToken,
  }, secret, { expiresIn: '30 days' });

  return { token };
}

module.exports = {
  gitlabToken,
};
