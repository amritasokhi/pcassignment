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

// Launch the app to a path, default: '/'
const launchApp = (basePath = '/') => {
  return driver.url(basePath)
}

// Click on login and open the modal
const openLoginModal = () => {
  return driver.waitForVisible(loginButton, waitTime).click(loginButton)
}

// Enter credentials in the login modal
const enterCredentials = (username, password) => {
  return driver
    .waitForVisible(modalUsername, waitTime)
    .setValue(modalUsername, username)
    .setValue(modalPassword, password)
}

// Open the modal, enter credentials and click Login
const login = (username, password) => {
  return openLoginModal()
    .then(() => {
      return enterCredentials(username, password)
    })
    .then(() => {
      return driver.click(modalLogin)
    })
}

module.exports = {
  launchApp,
  login,
}
