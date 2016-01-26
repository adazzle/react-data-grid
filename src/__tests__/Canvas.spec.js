let React        = require('react');
let rewire       = require('rewire');
let Canvas         = rewire('../Canvas');
let TestUtils    = require('react-addons-test-utils');

describe('Canvas Tests', () => {
  let testElement;

  let testProps = {
    rowHeight: 25,
    height: 200,
    displayStart: 1,
    displayEnd: 10,
    rowsCount: 1,
    columns: [],
    rowGetter: function() { return []; },
    cellMetaData: {
      selected: {},
      dragged: {},
      onCellClick: () => {},
      onCellDoubleClick: () => {},
      onCommit: () => {},
      onCommitCancel: () => {},
      copied: {},
      handleDragEnterRow: () => {},
      handleTerminateDrag: () => {}
    }
  };

  beforeEach(() => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
  });

  it('should create a new instance of Canvas', () => {
    expect(testElement).toBeDefined();
  });

  it('Should not call setScroll on render', () => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    spyOn(testElement, 'setScrollLeft');
    expect(testElement.setScrollLeft).not.toHaveBeenCalled();
  });

  it('Should not call setScroll on update', () => {
    testElement = TestUtils.renderIntoDocument(<Canvas {...testProps}/>);
    // force an update
    spyOn(testElement, 'setScrollLeft');
    testElement.componentDidUpdate(testProps);
    expect(testElement.setScrollLeft).not.toHaveBeenCalled();
  });
});
