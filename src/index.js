var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const fs = require('fs')

let baseurl = 'https://helixstack.in'
let urlArr = ['/#', '/careers.html', '/contact.html'];
let browserArr = ['FireFox', 'Chrome']
let allErrorByBrowser = {};

async function getAllFrontEndError(browserName) {
    let allUrlErrors = [];
    let whichBrowser = browserName.toUpperCase();
    let driver = await new Builder().forBrowser(Browser[whichBrowser]).build();
    try {
        urlArr.forEach(async (url) => {
            // await driver.get(`${baseurl}${url}`);
            driver
                .get(`${baseurl}${url}`)
                .then(function () {
                    AxeBuilder(driver).analyze(function (err, results) {
                        if (err) {
                            // Handle error somehow
                        }
                        allUrlErrors.push(results);
                    });
                });
        });
        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 5000);

    } finally {
        allErrorByBrowser[whichBrowser] = allUrlErrors;
        // console.log('allErrorByBrowser', allErrorByBrowser);
        let data = "Learning how to write in a file."

        // Write data in 'Output.txt' .
        fs.writeFile('Output.json', JSON.stringify(allErrorByBrowser), (err) => {

            // In case of a error throw err.
            if (err) throw err;
        })
        await driver.quit();
    }
}

browserArr.forEach((browserName) => {
    getAllFrontEndError(browserName);
});