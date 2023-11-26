//const { expect } = require("chai");
const { clickElement, putText, getText, choosePlace } = require("./lib/commands.js");
const { generateName, buyingScheme } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("ИдемВКино tests", () => {
    beforeEach(async () => {
      page = await browser.newPage();
      await page.goto("https://qamid.tmweb.ru/client/index.php");
      await page.waitForSelector("h1");
    });

  test("should successfully buy for tomorrow 1st movie (1 ticket)", async () => {
    await clickElement(page, "body > nav > a:nth-child(2) > span.page-nav__day-number");
    await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a");

    const placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${buyingScheme[0].row}) > span:nth-child(${buyingScheme[0].place})`;
    await clickElement(page, placeSelector);
    await clickElement(page, "button.acceptin-button");
      
    let actualCaptionText = await getText(page, "h2.ticket__check-title");
    await expect(actualCaptionText).toContain("Вы выбрали билеты:");
    let actualTicketsChairs = await getText(page, "span.ticket__chairs");
    await expect(actualTicketsChairs).toContain(`${buyingScheme[0].row}/${buyingScheme[0].place}`);

    // await clickElement(page, "button.acceptin-button");
    // actualCaptionText = await getText(page, "h2.ticket__check-title");
    // await expect(actualCaptionText).toContain("Электронный билет");
  });

  test("should successfully buy for aftertomorrow 2nd movie (3 tickets)", async () => {
    await clickElement(page, "body > nav > a:nth-child(3) > span.page-nav__day-number");
    await clickElement(page, "body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a");
    for (let i = 0; i < buyingScheme.length; i++) {
      const placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${buyingScheme[i].row}) > span:nth-child(${buyingScheme[i].place})`;
      await clickElement(page, placeSelector);
    }
    await clickElement(page, "button.acceptin-button");
      
    let actualCaptionText = await getText(page, "h2.ticket__check-title");
    await expect(actualCaptionText).toContain("Вы выбрали билеты:");
    let actualTicketsChairs = await getText(page, "span.ticket__chairs");
    let expectedTicketsChairs = "";
    for (let i = 0; i < buyingScheme.length; i++) {
      expectedTicketsChairs += `${buyingScheme[i].row}/${buyingScheme[i].place}`;
      if (i < buyingScheme.length - 1) {
        expectedTicketsChairs += ", ";
      }
    }
    await expect(actualTicketsChairs).toContain(expectedTicketsChairs);

  });

  test("should not buy if already bought (1 ticket)", async () => {

    const row = 5;
    const place = 5;

    // сначала покупаем билет
    await clickElement(page, "body > nav > a:nth-child(2) > span.page-nav__day-number");
    await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a");

    let placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place})`;
    await clickElement(page, placeSelector);
    await clickElement(page, "button.acceptin-button");
      
    let actualCaptionText = await getText(page, "h2.ticket__check-title");
    await expect(actualCaptionText).toContain("Вы выбрали билеты:");
    let actualTicketsChairs = await getText(page, "span.ticket__chairs");
    await expect(actualTicketsChairs).toContain(`${row}/${place}`);

    await clickElement(page, "button.acceptin-button");
    actualCaptionText = await getText(page, "h2.ticket__check-title");
    await expect(actualCaptionText).toContain("Электронный билет");


    // теперь пробуем купить его же еще раз
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await page.waitForSelector("h1");

    await clickElement(page, "body > nav > a:nth-child(2) > span.page-nav__day-number");
    await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a");

    placeSelector = `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place})`;
    await clickElement(page, placeSelector);

    const dis = await page.$eval("button.acceptin-button", btn =>  btn.disabled);
    await expect(dis).toEqual(true);
      
  });
});
