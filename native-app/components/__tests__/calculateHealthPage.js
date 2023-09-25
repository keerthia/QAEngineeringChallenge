
const puppeteer = require('puppeteer');
(async() => {
try{
const browser = await puppeteer.launch({
                                         headless: false});
const page = await browser.newPage();
await page.goto('http://localhost:8081');
console.log("Opened the web page");
await page.click('a[href="/two"]');
await browser.close();
}
catch (error) {
     console.error('An error occurred:', error);
   }
   }
);