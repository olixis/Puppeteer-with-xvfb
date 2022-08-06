const puppeteer = require("puppeteer");

const runner = async search => {

  console.log("Opening browser");
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox",'--start-maximized']
  });
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 1920,
    height: 1080
  });

  async function cleanup() {
    try {
      console.log("Cleaning up instances");
      await page.close();
      await browser.close();
    } catch (e) {
      console.log("Cannot cleanup istances");
    }
  }
  let resp = "";
  try {
    console.log("Navigating url");
    await page.goto(search, { waitUntil: "networkidle2" });
    resp = await page.content()
    await cleanup();
  } catch (e) {
    console.error("Error happened", e);
    await cleanup();
  }
  return resp;
};

module.exports = runner;
