const request = require('./request')
const assert = require('assert')

/**
 * Get branch details by DPRN
 * @param string dprn Direct Payment Routing Number
 * @returns Promise<response>
 */
const getBranchDataByDPRN = (dprn) => {
  return request
    .get(`/fif-branch-sandbox/branches/${dprn}`, {
      headers: {
        Accept: 'application/vnd.fif.api.v1+json',
      },
    })
    .then((response) => {
      assert.strictEqual(
        response.status,
        200,
        `Unexpected response status: ${response.status}`
      )
      return response
    })
}

module.exports = {
  getBranchDataByDPRN,
}
