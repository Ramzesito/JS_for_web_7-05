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

// Given("user is on {string} page", async function (string) {
//   return await this.page.goto(`https://netology.ru${string}`, {
//     setTimeout: 20000,
//   });
// });

// When("user search by {string}", async function (string) {
//   return await putText(this.page, "input", string);
// });

// Then("user sees the course suggested {string}", async function (string) {
//   const actual = await getText(this.page, "a[data-name]");
//   const expected = await string;
//   expect(actual).contains(expected);
// });

  Given("user is on place shoosing page for tomorrow {string} movie", async function (string) {
    // return await this.page.goto(`https://netology.ru${string}`, {
    //   setTimeout: 20000,
    // });

    await clickElement(this.page, "body > nav > a:nth-child(2) > span.page-nav__day-number");
    await clickElement(this.page, `body > main > section:nth-child(${string}) > div:nth-child(2) > ul > li > a`);
    //return "pending...";

    // const placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${buyingScheme[0].row}) > span:nth-child(${buyingScheme[0].place})`;
    // await clickElement(page, placeSelector);
    // await clickElement(page, "button.acceptin-button");
      
    // let actualCaptionText = await getText(page, "h2.ticket__check-title");
    // await expect(actualCaptionText).toContain("Вы выбрали билеты:");
    // let actualTicketsChairs = await getText(page, "span.ticket__chairs");
    // await expect(actualTicketsChairs).toContain(`${buyingScheme[0].row}/${buyingScheme[0].place}`);

  });

  When("user choose one ticket at {string} row, {string} place", async function (row, place) {
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