// UI testing
const assert = require("chai").assert;
const puppeteer = require("puppeteer");
let browser, page,
url = __dirname + "/index.html",
delay = 5000;

// puppeteer options
const opts = {
  headless: false,
  slowMo: 250
};

before(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

describe("Tests the validation of 2 emails< valid and invalid", function() {
    it("Passing a valid email", async () => {
        await page.goto(url);
        await page.waitForSelector("input");
        let classesSuccess = await page.evaluate(async (delay) => {
            document.querySelector("input").value = "somemail@yandex.ru";
            document.querySelector("button.btn").click();
            await new Promise(function(resolve) {
                setTimeout(resolve, delay);
            });
            return document.querySelector("input").className;
        }, delay);
        assert.equal("form-control is-valid", classesSuccess);
    });

    it("Passing an invalid email", async () => {
        await page.goto(url);
        await page.waitForSelector("input");
        let classesFailure = await page.evaluate(async (delay) => {
            document.querySelector("input").value = "somemail@yand==ex.ru";
            document.querySelector("button.btn").click();
            await new Promise(function(resolve) {
                setTimeout(resolve, delay);
            });
            return document.querySelector("input").className;
        }, delay);
        assert.equal("form-control is-invalid", classesFailure);
    });
});

after(async () => {
  await browser.close();
});
