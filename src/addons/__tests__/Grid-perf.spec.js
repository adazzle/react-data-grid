import ReactPerf from 'react-addons-perf';
import GridRunner from './GridRunner';
import { SummaryParser } from './performance/PerformanceUtils';
const ImmutableGrid = require('../../../examples/scripts/example11-immutable-data');

const doScroll = (i, total, gridRunner, onComplete) => {
  if (i === total) {
    onComplete();
    return;
  }

  let cell;
  try {
    cell = gridRunner.getCell({ cellIdx: 1, rowIdx: i });
    gridRunner.keyDown({ key: 'ArrowDown' }, cell);
    doScroll(i + 1, total, gridRunner, onComplete);
  } catch (ex) {
    setTimeout(() => {
      doScroll(i, total, gridRunner, onComplete);
    }, 1);
  }
};

fdescribe('Grid peformance tests', () => {
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

  it('should not waste instances on scroll', (done) => {
    const ROWS_TO_SCROLL = 27;
    grid.selectCell({cellIdx: 1, rowIdx: 0});
    ReactPerf.start();
    const onScrollComplete = () => {
      ReactPerf.stop();
      let measurements = ReactPerf.getLastMeasurements();

      let summary = ReactPerf.getMeasurementsSummaryMap(measurements);
      ReactPerf.printWasted(measurements);
      let summaryParser = new SummaryParser(summary);

      expect(summaryParser.getByComponent('Cell').wastedInstances <= 1000).toBeTruthy();
      done();
    };

    doScroll(0, ROWS_TO_SCROLL, grid, onScrollComplete);
  });
});
