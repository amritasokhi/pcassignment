/**
 * Selectors and actions to be performed from My Apps tab
 */
const assert = require('assert')
const driver = require('./setup')

const waitTime = 2000

// selectors
const addAppButton = '//a[contains(@class,"add-app")]'
// the delete tab in the expanded div panel (app) expressed by the class 'in'
const deleteTab = 'div.panel-collapse.collapse.in li.apigee-modal-link-delete'
const modalDeleteButton = '#edit-actions > #edit-submit'
// consumer key, secret elements under the expanded app
const consumerKeyXpath =
  '//div[@class="panel-collapse collapse in"]//div[contains(@class,"title") and text()="Consumer Key"]/following-sibling::div'
const consumerSecretXpath =
  '//div[@class="panel-collapse collapse in"]//div[contains(@class,"title") and text()="Consumer Secret"]/following-sibling::div'
// get xapth by app name
const getAppXpath = (appName) => `//a[contains(text(), "${appName}")]`

// click on Add a New App
const startAddApp = () => {
  return driver.waitForVisible(addAppButton, waitTime).click(addAppButton)
}

// Validate the app created message
const validateAppCreatedMessage = () => {
  const appCreated = 'App Created!'
  return driver
    .waitForVisible('.error-summary', waitTime)
    .getText('.error-summary')
    .then((response) => {
      assert.strictEqual(
        response,
        appCreated,
        `App creation validation failed. Response: ${response}`
      )
    })
}

// expand or collapse an apps details by appName
const toggleAppDetails = (appName) => {
  const myApp = getAppXpath(appName)
  return driver.waitForVisible(myApp, waitTime).scroll(myApp).click(myApp)
}

/**
 * Extract consumer info from an expanded app's details
 * @returns Promise<{consumerKey, consumerSecret}>
 */
const extractConsumerInfo = async () => {
  await driver.waitForVisible(consumerKeyXpath, waitTime)
  const consumerKey = await driver.getText(consumerKeyXpath)
  const consumerSecret = await driver.getText(consumerSecretXpath)
  return { consumerKey, consumerSecret }
}

// Click on Delete from an app's expanded panel
const startDeleteApp = () => {
  return driver
    .waitForVisible(deleteTab, waitTime)
    .scroll(deleteTab)
    .click(deleteTab)
}

// Click on delete button from the delete panel
const modalDelete = () => {
  const extendedWaitTime = 5000
  return driver
    .waitForVisible(modalDeleteButton, extendedWaitTime)
    .click(modalDeleteButton)
}

// delete the app e2e from details to modal
const deleteExpandedApp = () => {
  return startDeleteApp().then(() => modalDelete())
}

module.exports = {
  startAddApp,
  validateAppCreatedMessage,
  toggleAppDetails,
  extractConsumerInfo,
  deleteExpandedApp,
}