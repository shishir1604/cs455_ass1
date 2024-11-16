const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loadTimeTest() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    try {
        let start = Date.now();
        // await driver.get('https://cs455-ass1.onrender.com/');  // or your hosted URL
        await driver.get('http://localhost:3000/');  // or your hosted URL
        await driver.wait(until.elementLocated(By.id('startButton')), 10000);  // Wait for a key element
        let loadTime = Date.now() - start;
        console.log(`Game page load time: ${loadTime} ms`);
    } finally {
        await driver.quit();
    }
})();
