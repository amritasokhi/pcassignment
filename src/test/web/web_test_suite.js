const driver = require('./setup')

// Pages / modules
const common = require('./common.js')
const dashboard = require('./dashboard')
const myApps = require('./myApps')
const addApss = require('./addApps')

// import data
const users = require('../data/users.json')

// Test data
const { username, password } = users['testUser1']
const appName = 'Asokhi Test App'
const appType = 'fif-branch'

describe('Web Test Suite', function () {
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
    return myApps.extractConsumerInfo().then((info) => {
      const { consumerKey, consumerSecret } = info
      console.log({ consumerKey, consumerSecret })
    })
  })

  it('Delete the expanded app', () => {
    return myApps.deleteExpandedApp()
  })
})
