const express = require("express");
const app = express();
const runner = require("./puppeteer");
const port = process.env.PORT || 3000;

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/scrape", async (req, res) => {
  const { search } = req.body;
  const data = await runner(search);
  return res.json({ data });
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
