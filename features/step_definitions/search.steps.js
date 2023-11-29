const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, putText, getText } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.waitForSelector("h1");
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

  Given("user is on place choosing page for tomorrow {string} movie", async function (string) {
    await clickElement(this.page, "body > nav > a:nth-child(2) > span.page-nav__day-number");
    await clickElement(this.page, `body > main > section:nth-child(${string}) > div:nth-child(2) > ul > li > a`);
  });

  When("user chooses one ticket at row {string} and place {string}", async function (row, place) {
    const placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place})`;
    await clickElement(this.page, placeSelector);
    await clickElement(this.page, "button.acceptin-button");
  });

  Then("user sees his tickets selected with notice {string}, {string}", async function (notice, position) {
    let actualCaptionText = await getText(this.page, "h2.ticket__check-title");
    await expect(actualCaptionText).contains(notice);
    let actualTicketsChairs = await getText(this.page, "span.ticket__chairs");
    await expect(actualTicketsChairs).contains(position);
  });

  Given("user is on place choosing page for aftertomorrow {string} movie", async function (string) {
    await clickElement(this.page, "body > nav > a:nth-child(3) > span.page-nav__day-number");
    await clickElement(this.page, `body > main > section:nth-child(${string}) > div:nth-child(2) > ul > li > a`);
  });

  When("user chooses three tickets at rows {string},{string},{string} and places {string},{string},{string}", async function (row1, row2, row3, place1, place2, place3) {
    let placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row1}) > span:nth-child(${place1})`;
    await clickElement(this.page, placeSelector);
    placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row2}) > span:nth-child(${place2})`;
    await clickElement(this.page, placeSelector);
    placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row3}) > span:nth-child(${place3})`;
    await clickElement(this.page, placeSelector);
    await clickElement(this.page, "button.acceptin-button");
  });

  When("user buys selected tickets", async function () {
    await clickElement(this.page, "button.acceptin-button");
    const actualCaptionText = await getText(this.page, "h2.ticket__check-title");
    await expect(actualCaptionText).contains("Электронный билет");
  });

  Then("user can not buy tickets, button disabled", async function () {
    const dis = await this.page.$eval("button.acceptin-button", btn =>  btn.disabled);
    await expect(dis).equals(true);
  });

  When("user returns main page", async function () {
    await this.page.goto("https://qamid.tmweb.ru/client/index.php");
    await this.page.waitForSelector("h1");
  });