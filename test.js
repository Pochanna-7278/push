const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver'); 
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments('--start-maximized');

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build(); 

async function runTest() {
    try {
        await driver.get('file://' + __dirname + '/index.html');
        
        const num1 = await driver.findElement(By.id('num1'));
        await num1.sendKeys('40');
        
        const num2 = await driver.findElement(By.id('num2'));
        await num2.sendKeys('10');

        const addButton = await driver.findElement(By.id('add'));
        await addButton.click();

        const result = await driver.findElement(By.id('result'));
        await driver.wait(until.elementTextIs(result, '60'), 5000);
        
        const text = await result.getText();
        assert.strictEqual(text, '60', 'Sum is incorrect');
        console.log('Test passed');

        await new Promise(() => {});

    } catch (error) {
        console.error('Test failed', error);
    } 
}

runTest();