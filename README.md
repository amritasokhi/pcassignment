
# Sr API and QA Engineer Technical Assessment Test

## Installation steps
1. Clone the repo https://github.com/amritasokhi/pcassignment.git
2. `cd pcassignment/`
3. Execute `npm install`
4. Execute `npm run seleniumstart` for starting up the selenium standalone server

## Running the code
1. Add you email-id and password under src/test/data/users.json
2. Open up a new terminal. cd to pcassignment/
3. Execute `npm run test` : This will execute the full test flow as described in the assignment. (Executed on Chrome browser)
4. Once the test execution has completed, you can find allure test results under allure-results directory.
5. Execute `npm run report` : This will generate and serve the allure report

### Additional scripts
- `npm run testapi` : Executes a standalone api test suite (Prerequisite - need valid consumer credentials under src/test/data/consumer.json)
- `npm run testweb` : Executes a standalone web test suite (Prerequisite - need email-id and password under src/test/data/users.json)
- `npm run clean` : Removes the allure-results and allure-report files
