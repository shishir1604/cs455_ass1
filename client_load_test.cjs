const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function measureLoadTime() {
    let options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    async function getLoadTime(url) {
        await driver.get(url);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate `time.sleep(2)` in Python
        const timingData = await driver.executeScript("return window.performance.timing");
        const loadTime = (timingData.loadEventEnd - timingData.navigationStart) / 1000.0;
        return loadTime;
    }

    const gameUrls = [
        "https://cs455-ass1.onrender.com", 
        "https://cs455-ass1-1.onrender.com", 
        "https://twocs455-ass1.onrender.com"
    ];
    const leaderboardUrl = "/high-score";

    for (let url of gameUrls) {
        const gameClientLoadTime = await getLoadTime(url);
        const leaderboardLoadTime = await getLoadTime(url + leaderboardUrl);

        console.log(`${url} Load Time: ${gameClientLoadTime} seconds`);
        console.log(`${url} Leaderboard Page Load Time: ${leaderboardLoadTime} seconds`);
        console.log();
    }

    await driver.quit();
})();
