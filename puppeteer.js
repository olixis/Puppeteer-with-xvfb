const puppeteer = require("puppeteer");

const runner = async search => {

  console.log("Opening browser");
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  async function cleanup() {
    try {
      console.log("Cleaning up instances");
      await page.close();
      await browser.close();
    } catch (e) {
      console.log("Cannot cleanup istances");
    }
  }

  try {
    console.log("Navigating url");
    await page.goto(search, { waitUntil: "networkidle2" });
    await cleanup();
  } catch (e) {
    console.error("Error happened", e);
    await page.screenshot({ path: "error.png" });
    await cleanup();
  }
  return await page.content();
};

module.exports = runner;
