import ReactPerf from 'react-addons-perf';
import GridRunner from './GridRunner';
import { SummaryParser } from './performance/PerformanceUtils';
const ImmutableGrid = require('../../../examples/scripts/example11-immutable-data');

const ScrollType = {
  VERTICAL: 0,
  HORIZONTAL: 1
};

const NAVIGATION_BY_SCROLLTYPE = {
  [ScrollType.VERTICAL]: {
    key: 'ArrowDown',
    getNext: (x, y) => { return { y: y + 1, x }; },
    shouldStop: (x, y, expected) => y === expected
  },
  [ScrollType.HORIZONTAL]: {
    key: 'ArrowRight',
    getNext: (x, y) => { return { y, x: x + 1 }; },
    shouldStop: (x, y, expected) => x === expected
  }
};

const doScroll = (xx, yy, total, gridRunner, onComplete, scrollType) => {
  const { key, getNext, shouldStop } = NAVIGATION_BY_SCROLLTYPE[scrollType];

  if (shouldStop(xx, yy, total)) {
    onComplete();
    return;
  }

  let cell = gridRunner.getCell({ cellIdx: xx, rowIdx: yy });
  gridRunner.keyDown({ key }, cell);

  const { x, y } = getNext(xx, yy);

  setTimeout(() => {
    doScroll(x, y, total, gridRunner, onComplete, scrollType);
  }, 1);
};

const doHorizontalScroll = (x, y, total, gridRunner, onComplete) => {
  doScroll(x, y, total, gridRunner, onComplete, ScrollType.HORIZONTAL);
};

const doVerticalScroll = (x, y, total, gridRunner, onComplete) => {
  doScroll(x, y, total, gridRunner, onComplete, ScrollType.VERTICAL);
};

const onScrollComplete = (done) => {
  ReactPerf.stop();
  let measurements = ReactPerf.getLastMeasurements();

  let summary = ReactPerf.getMeasurementsSummaryMap(measurements);
  ReactPerf.printWasted(measurements);
  let summaryParser = new SummaryParser(summary);

  expect(summaryParser.getByComponent('Cell').wastedInstances <= 1000).toBeTruthy();
  done();
};

xdescribe('Grid peformance tests', () => {
  let originalTimeout;
  let grid = {};
  beforeEach(() => {
    grid = new GridRunner({renderIntoBody: true, GridUnderTest: ImmutableGrid});
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
  });

  afterEach(() => {
    grid.dispose();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  describe('Vertical Scroll', () => {
    it('should not waste instances on scroll', (done) => {
      const ROWS_TO_SCROLL = 1200;
      grid.selectCell({cellIdx: 0, rowIdx: 0});
      ReactPerf.start();

      doVerticalScroll(0, 0, ROWS_TO_SCROLL, grid, onScrollComplete.bind(null, done), ScrollType.VERTICAL);
    });
  });

  describe('Horizontal scroll', () => {
    it('should not waste instances on scroll', (done) => {
      const COLUMNS_TO_SCROLL = 20;
      grid.selectCell({cellIdx: 0, rowIdx: 0});
      ReactPerf.start();

      doHorizontalScroll(0, 0, COLUMNS_TO_SCROLL, grid, onScrollComplete.bind(null, done), ScrollType.HORIZONTAL);
    });
  });
});
