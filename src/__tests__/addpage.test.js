const puppeteer = require("puppeteer");
const path = require("path");

const imagePath = path.resolve(__dirname, "test.jpeg");

let browser, page;

jest.setTimeout(10000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await page.click(".btn-block");

  await page.waitFor("input[name='name']");
});

afterEach(async () => {
  await browser.close();
});

describe("on improper form inputs", () => {
  beforeEach(async () => {
    await clearInput(page);

    await page.click(".btn-success");
    await page.click(".btn-success");
  });

  it("shows error message", async () => {
    const err = await page.$eval(".invalid-feedback", (el) => el.innerHTML);
    expect(err).toEqual("name is required");

    const imageErr = await page.$eval(".alert", (el) => el.innerHTML);
    expect(imageErr).toEqual("file is required");
  });
});

describe("on proper form inputs submit", () => {
  beforeEach(async () => {
    await clearInput(page);

    await uploadFile(page);

    await page.type('input[name="name"]', "valid name");

    await page.click(".btn-success");

    await page.waitFor(".card");
  });

  it("redirects to home page on submission", async () => {
    const addBtn = await page.$eval(".btn-block", (el) => el.innerHTML);
    expect(addBtn).toEqual("Add school");
  });

  it("updates adds the new school for preview", async () => {
    const title = await page.$eval(
      ".mt-2 .card:last-of-type h5",
      (el) => el.innerHTML
    );
    expect(title).toEqual("valid name");
  });
});

const clearInput = async (page) => {
  const inputValue = await page.$eval('input[name="name"]', (el) => el.value);

  await page.click('input[name="name"]');

  for (let i = 0; i < inputValue.length; i++) {
    await page.keyboard.press("Backspace");
  }
};

const uploadFile = async (page) => {
  const elementHandler = await page.$('input[type="file"]');
  await elementHandler.uploadFile(imagePath);
};
