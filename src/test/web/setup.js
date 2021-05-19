const webdriverio = require('webdriverio')

// Webdriverio options for standalone selenium server
const webdriverOptions = {
  host: process.env.selenium || 'localhost',
  desiredCapabilities: {
    browserName: 'chrome',
  },
  port: 5555, // selenium server running on this port
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
