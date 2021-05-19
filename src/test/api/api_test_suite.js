const assert = require('assert')
const auth = require('./auth')
const fifBranchApi = require('./fif_branch')

// consume test data from file
const testConsumer = require('../data/consumer.json')
// test DPRN
const DPRN = '123456789'

/**
 * Standalone Suite to test the api
 */
describe('Execute API call programmatically', () => {
  before('Set test credentials for this suite', () => {
    auth.setConsumerCredentials(testConsumer)
  })

  it('Authenticate, save token', () => {
    return auth.authenticate()
  })

  it(`Get branch data by DPRN <${DPRN}>`, () => {
    return fifBranchApi.getBranchDataByDPRN(DPRN).then((response) => {
      const data = response.data
      const identificationNumber = data.identificationNumber
      assert(
        identificationNumber.startsWith(DPRN),
        `Identification number (${identificationNumber}) does not start with DPRN (${DPRN})`
      )
    })
  })
})
