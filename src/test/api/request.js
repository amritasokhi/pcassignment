const axios = require('axios').default

// add defaults to request
const request = axios.create({
  baseURL: 'https://api.payments.ca',
  timeout: 2000,
})

module.exports = request
