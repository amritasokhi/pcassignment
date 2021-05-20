/**
 * Common selectors and actions that a user can access from other pages
 */
const driver = require('./setup')

const waitTime = 2000

// Selectors
const loginButton = '.account-menu > li:nth-child(2)'
const modalUsername = '#edit-name'
const modalPassword = '#edit-pass'
const modalLogin = '#edit-submit'
const gettingStarted = '//a[contains(text(), "Getting Started")]'

// Launch the app to a path, default: '/'
const launchApp = allure.createStep(
  'Launch the app to provided url',
  (basePath = '/') => {
    return driver.url(basePath)
  }
)

// Click on login and open the modal
const openLoginModal = allure.createStep('Open the login modal', () => {
  return driver.waitForVisible(loginButton, waitTime).click(loginButton)
})

// Enter credentials in the login modal
const enterCredentials = allure.createStep(
  'Enter the credentials',
  (username, password) => {
    return driver
      .waitForVisible(modalUsername, waitTime)
      .setValue(modalUsername, username)
      .setValue(modalPassword, password)
  }
)

// Check if user is logged in
const isUserLoggedIn = allure.createStep(
  'Check if the user is already logged in',
  () => {
    return driver
      .waitForVisible(gettingStarted, waitTime)
      .isVisible(loginButton)
      .then((isVisible) => {
        // if login is visible user is not logged in
        return isVisible ? false : true
      })
  }
)

// Open the modal, enter credentials and click Login
const login = allure.createStep('LogIn to app', (username, password) => {
  return openLoginModal()
    .then(() => {
      return enterCredentials(username, password)
    })
    .then(() => {
      return driver.click(modalLogin)
    })
})

// Log in the user if not already logged in
const loginIfNotLoggedIn = allure.createStep(
  'Log In the user if not already logged in',
  (username, password) => {
    return isUserLoggedIn().then((loggedIn) => {
      return !loggedIn && login(username, password)
    })
  }
)

module.exports = {
  launchApp,
  login,
  loginIfNotLoggedIn,
}
