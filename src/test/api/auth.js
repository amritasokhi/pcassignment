const request = require('./request')
const assert = require('assert')

let AUTH_TOKEN = ''
const CONSUMER_CREDENTIALS = {
  consumerKey: '',
  consumerSecret: '',
}

/**
 * Get Authentication token and update request object with the token
 * @param {*} consumer credentials for authentication, default: CONSUMER_CREDENTIALS
 * @returns Promise
 */
const authenticate = ({
  consumerKey,
  consumerSecret,
} = CONSUMER_CREDENTIALS) => {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  return request
    .post('/accesstoken', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    })
    .then((response) => {
      assert.strictEqual(
        response.status,
        200,
        `Unexpected response status: ${response.status}`
      )
      // Set auth token to be shared/used
      AUTH_TOKEN = response.data['access_token']
      // add authorization header to request globally
      request.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
    })
}

const getToken = () => AUTH_TOKEN

// set consumer credentials to be shared/used
const setConsumerCredentials = ({ consumerKey, consumerSecret }) => {
  CONSUMER_CREDENTIALS.consumerKey = consumerKey
  CONSUMER_CREDENTIALS.consumerSecret = consumerSecret
}

const getConsumerCredentials = () => CONSUMER_CREDENTIALS

module.exports = {
  authenticate,
  getToken,
  setConsumerCredentials,
  getConsumerCredentials,
}
