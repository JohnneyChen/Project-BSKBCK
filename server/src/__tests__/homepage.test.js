const puppeteer = require("puppeteer");
const School = require("../models/School");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();

  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

describe("when there is no record", () => {
  beforeAll(async () => {
    await School.remove({});
  });

  describe("it displays a header and", () => {
    it("it has links to navigate to home and add form", async () => {
      const logo = await page.$eval("a.navbar-brand", (el) => el.innerHTML);

      expect(logo).toContain("Dreamschooling");

      await page.click("a.nav-link");

      await page.waitFor('input[name="name"]');

      const title = await page.$eval("h3.my-2", (el) => el.innerHTML);

      expect(title).toEqual("Add a School");
    });
  });

  describe("it shows button to add school", () => {
    it("shows button with text add school", async () => {
      const text = await page.$eval(".btn-block", (el) => el.innerHTML);

      expect(text).toEqual("Add school");
    });

    it("navigates to new form when clicked", async () => {
      await page.click(".btn-block");

      await page.waitFor('input[name="name"]');

      const title = await page.$eval("h3.my-2", (el) => el.innerHTML);

      expect(title).toEqual("Add a School");
    });
  });
});

describe("when there is a record", () => {
  beforeAll(async () => {
    await new School({ name: "test", image: "placeholder" }).save();
    await new School({ name: "test2", image: "placeholder" }).save();
  });

  it("lists all instances of school", async () => {
    const elements = await page.$eval(".mt-2", (el) => el.children.length);

    expect(elements).toBeGreaterThanOrEqual(3);
  });

  it("has link to direct to each records show page", async () => {
    await page.click("h5.card-title");

    await page.waitFor(".card-img-top");

    const edit = await page.$eval(".btn-large", (el) => el.innerHTML);

    expect(edit).toEqual("Edit post");
  });
});
