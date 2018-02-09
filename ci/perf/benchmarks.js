const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

const logPageMetrics = async (page) => {
  const pageMetrics = await page.metrics();
  console.log(pageMetrics);
  // client.addEvent('scrollDown250Rows', pageMetrics);
};

const Key = {
  Down: 'ArrowDown',
  Up: 'ArrowUp',
  Right: 'ArrowRight'
};

const loadMediaPlan = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setViewport({width: 1920, height: 1080});
  await page.goto('http://localhost:8080/examples.html#/immutable-data?react_perf');
  return {page, browser};
};

const clickCell = async (page) => {
  const inputElement = await page.$('.react-grid-Cell');
  await inputElement.click();
};

const navigateCells = async (page, direction, numberCells) => {
  for (let i = 0; i < numberCells; i ++) {
    await page.keyboard.press('ArrowDown');
  }
};

(async () => {
  const {page, browser} = await loadMediaPlan();
  await clickCell(page);
  await page.tracing.start({path: `benchmarks/trace.json`});
  const startTime = performance.now();
  await navigateCells(page, Key.Down, 20);
  await logPageMetrics(page);
  const endTime = performance.now() - startTime;
  console.log(endTime);
  await page.tracing.stop();
  await browser.close();
})();
