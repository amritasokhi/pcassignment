require('mocha-allure-reporter')
const webdriverio = require('webdriverio')

// Webdriverio options for selenium-standalone server
const webdriverOptions = {
  host: process.env.selenium || 'localhost',
  desiredCapabilities: {
    browserName: 'chrome',
  },
  baseUrl: 'https://developer.payments.ca',
}

const driver = webdriverio.remote(webdriverOptions)

// initialize driver before the web automation run
before('Webdriver setup', function () {
  this.timeout(5000)
  return driver.init().windowHandleMaximize()
})

// teardown driver after the web automation run
after('Webdriver teardown', function () {
  this.timeout(2000)
  return driver.end()
})

module.exports = driver
