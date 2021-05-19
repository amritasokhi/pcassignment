const assert = require('assert')

// Pages / modules
const common = require('./web/common.js')
const dashboard = require('./web/dashboard')
const myApps = require('./web/myApps')
const addApss = require('./web/addApps')
const auth = require('./api/auth')
const fifBranchApi = require('./api/fif_branch')

// import data
const users = require('./data/users.json')

// Test data
const { username, password } = users['testUser1']
const appName = 'Asokhi Test App'
const appType = 'fif-branch'
const DPRN = '123456789'

describe('Assignment Test Suite', function () {
  this.timeout(10000)

  it('Launch App', () => {
    return common.launchApp()
  })

  it('Login', () => {
    return common.login(username, password)
  })

  it('Navigate to My Apps', () => {
    return dashboard.navigateToMyApps()
  })

  it('Add a New App', () => {
    return myApps.startAddApp()
  })

  it('Create a new App', () => {
    return addApss.createAnApp(appName, appType)
  })

  it('Validate App created', () => {
    return myApps.validateAppCreatedMessage()
  })

  it('Expand App details', () => {
    return myApps.toggleAppDetails(appName) // expand
  })

  it('Extract Consumer Key and Secret', () => {
    return myApps.extractConsumerInfo().then((consumerCredentials) => {
      const { consumerKey, consumerSecret } = consumerCredentials
      // save consumer credentials for use in api requests
      auth.setConsumerCredentials(consumerCredentials)
    })
  })

  // API TESTS
  it('Authenticate, save token', () => {
    // authenticate using saved consumer credentials
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

  // Delete the app from GUI
  it('Delete the expanded app', () => {
    return myApps.deleteExpandedApp()
  })
})
