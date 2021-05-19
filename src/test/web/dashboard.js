/**
 * Selectors and actions to be performed from the dashboard (for a logged in user)
 */
const driver = require('./setup')
const waitTime = 2000

// Selectors
const myAppsTab = '//a[@title="My Apps"]'

/**
 * Click the My Apps tab
 */
const navigateToMyApps = allure.createStep('Navigate to My Apps', () => {
  return driver.waitForVisible(myAppsTab, waitTime).click(myAppsTab)
})

module.exports = {
  navigateToMyApps,
}
