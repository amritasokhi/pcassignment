/**
 * Selectors and actions to be performed while adding a new app
 */
const driver = require('./setup')

const waitTime = 2000
// selectors
const appNameField = '#edit-human'
const createAppButton = '#edit-submit'

// A map of app labels and the corresponding xpath
// xpath description: label with a child input with the specified id
const appLabelXpathMap = {
  'ccin-extracts':
    '//label[input[@id="edit-api-product-prod-ccin-extracts-api-resources-sandbox"]]',
  'fif-branch':
    '//label[input[@id="edit-api-product-prod-fif-branch-api-resources-sandbox"]]',
  //  etc
}

/**
 * Create a new app
 * @param {string} appName The name to be provided to the new app
 * @param {string} appType The app type, one of the keys in appLabelXpathMap, default: ccin-extracts
 * @returns
 */
const createAnApp = allure.createStep(
  'Create an app by adding name, selecting type and submit',
  (appName, appType = 'ccin-extracts') => {
    const appLabelXpath = appLabelXpathMap[appType]
    return driver
      .waitForVisible(appNameField, waitTime)
      .setValue(appNameField, appName)
      .scroll(appLabelXpath) // bring to view
      .waitForVisible(appLabelXpath, waitTime)
      .click(appLabelXpath)
      .scroll(createAppButton)
      .click(createAppButton)
  }
)

module.exports = {
  createAnApp,
}
