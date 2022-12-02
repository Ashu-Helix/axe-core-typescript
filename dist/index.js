var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AxeBuilder = require("axe-webdriverjs");
var WebDriver = require("selenium-webdriver");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
let baseurl = "https://helixstack.in";
let urlArr = ["/#", "/careers.html", "/contact.html"];
let browserArr = ["FireFox", "Chrome"];
let allErrorByBrowser = {};
function getAllFrontEndError(browserName) {
    return __awaiter(this, void 0, void 0, function* () {
        let allUrlErrors = [];
        let whichBrowser = browserName.toUpperCase();
        let driver = yield new Builder().forBrowser(Browser[whichBrowser]).build();
        try {
            urlArr.forEach((url) => __awaiter(this, void 0, void 0, function* () {
                // await driver.get(`${baseurl}${url}`);
                driver.get(`${baseurl}${url}`).then(function () {
                    AxeBuilder(driver).analyze(function (err, results) {
                        if (err) {
                            // Handle error somehow
                        }
                        allUrlErrors.push(results);
                    });
                });
            }));
            // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
            yield driver.wait(until.titleIs("webdriver - Google Search"), 5000);
        }
        finally {
            allErrorByBrowser[whichBrowser] = allUrlErrors;
            // console.log('allErrorByBrowser', allErrorByBrowser);
            let data = "Learning how to write in a file.";
            // Write data in 'Output.txt' .
            fs.writeFile("Output.json", JSON.stringify(allErrorByBrowser), err => {
                // In case of a error throw err.
                if (err)
                    throw err;
            });
            yield driver.quit();
        }
    });
}
browserArr.forEach(browserName => {
    getAllFrontEndError(browserName);
});
//# sourceMappingURL=index.js.map