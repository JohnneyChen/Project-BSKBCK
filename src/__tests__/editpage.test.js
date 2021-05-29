const puppeteer = require("puppeteer");

let browser, page;

jest.setTimeout(10000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await page.click("h5.card-title");

  await page.waitFor(".card-img-top");

  await page.click(".btn-large");

  await page.waitFor("h3.my-2");
});

afterEach(async () => {
  await browser.close();
});

it("populates with existing data on arrive", async () => {
  const val = await page.$eval('input[name="name"]', (el) => el.value);

  expect(val).toBeDefined();
});

describe("on improper form inputs", () => {
  beforeEach(async () => {
    await clearInput(page);
  });

  it("shows error message", async () => {
    await page.click(".btn-success");

    const err = await page.$eval(".invalid-feedback", (el) => el.innerHTML);
    expect(err).toEqual("name is required");
  });
});

describe("on proper form inputs submit", () => {
  beforeEach(async () => {
    await clearInput(page);

    await page.type('input[name="name"]', "valid name");

    await page.click(".btn-success");

    await page.waitFor(".card-img-top");
  });

  it("redirects to show page on submission", async () => {
    const edit = await page.$eval(".btn-large", (el) => el.innerHTML);

    expect(edit).toEqual("Edit post");
  });

  it("updates show page information", async () => {
    const newName = await page.$eval("h5.card-title", (el) => el.innerHTML);
    expect(newName).toEqual("valid name");
  });
});

const clearInput = async (page) => {
  const inputValue = await page.$eval('input[name="name"]', (el) => el.value);

  await page.click('input[name="name"]');

  for (let i = 0; i < inputValue.length; i++) {
    await page.keyboard.press("Backspace");
  }
};
