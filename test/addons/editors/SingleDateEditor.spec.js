'use strict';
var React            = require('react');
var TestUtils        = require('react/lib/ReactTestUtils');
var rewire           = require('rewire');
var rewireModule     = require('../../rewireModule');
var StubComponent    = require('../../stubComponent');
var SingleDateEditor = rewire('../../../src/addons/editors/SingleDateEditor.js');
var moment           = require('moment');

describe('SingleDateEditor', () => {

  var component;
  var DateRangePickerStub = StubComponent('DateRangePicker');
  var ExcelColumn = React.createFactory('div');

  // Configure local variable replacements for the module.
  rewireModule(SingleDateEditor, {
    ExcelColumn: ExcelColumn,
    DateRangePicker: DateRangePickerStub
  });

  var fakeColumn = { key: 'startDate' };
  function fakeCommitCb(object) { };

  var fakeEvent = { type: 'apply' };
  var fakePicker = { startDate: '10 Sep 2015'};


  describe('Basic tests', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<SingleDateEditor column={fakeColumn} onCommit={fakeCommitCb} />);
    });

    it('should create a new instance of SingleDateEditor', () => {
      expect(component).toBeDefined();
    });

    it('should use DD MMM YYYY as the default format', () => {
      expect(component.props.format).toBe('DD MMM YYYY');
    });

    it('should accept dates matching the format', () => {
      var toCommit = {
        startDate: '10 Sep 2015'
      };
      expect(component.validate(toCommit)).toBe(true);
    });

    it('should reject dates not matching the format', () => {
      var toCommit = {
        startDate: '10/9/2015'
      };
      expect(component.validate(toCommit)).toBe(false);
    });

    it('should reject text that cannot be parsed to a date', () => {
      var toCommit = {
        startDate: 'something'
      };
      expect(component.validate(toCommit)).toBe(false);
    });

    it('should parse date strings into the selected format', () => {
      expect(component.formatDate('10 September 2015')).toBe('10 Sep 2015');
      expect(component.formatDate('9/10/15')).toBe('10 Sep 2015');
    });

    it('should parse date objects into the selected format', () => {
      expect(component.formatDate(new Date(2015,8,10))).toBe('10 Sep 2015');
    });

    it('should parse moment objects into the selected format', () => {
      expect(component.formatDate(new moment('10 September 2015'))).toBe('10 Sep 2015');
      expect(component.formatDate(new moment('9/10/15'))).toBe('10 Sep 2015');
    });

    it('should return the defaultValue if formatting an empty string', () => {
      expect(component.formatDate('')).toBe(component.props.defaultValue);
    });

    it('should return the defaultValue if formatting nothing', () => {
      expect(component.formatDate()).toBe(component.props.defaultValue);
    });

    it('should set the input value on apply', () => {
      component.handleEvent(fakeEvent, fakePicker);
      expect(component.getInputNode().value).toBe('10 Sep 2015');
    });

    it('should pass the format down to the DateRangePicker as a prop', () => {
      var DateRangePickerComponent = TestUtils.findRenderedComponentWithType(component, DateRangePickerStub);
      expect(DateRangePickerComponent.props.format).toBe(component.props.format);
    });

    it('should pass the defaultValue date down to the DateRangePicker as a prop', () => {
      var DateRangePickerComponent = TestUtils.findRenderedComponentWithType(component, DateRangePickerStub);
      expect(DateRangePickerComponent.props.startDate).toBe(component.props.defaultValue);
    });

    it('should pass the formated date down to the input as a placeholder', () => {
      expect(component.getInputNode().placeholder).toBe(component.props.defaultValue);
    });

    it('should pass the apply event callback down to the DateRangePicker as a prop', () => {
      var DateRangePickerComponent = TestUtils.findRenderedComponentWithType(component, DateRangePickerStub);
      DateRangePickerComponent.props.onEvent(fakeEvent, fakePicker);
      expect(component.getInputNode().value).toBe('10 Sep 2015');
    });
  });

  describe('With typeof value === string', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<SingleDateEditor column={fakeColumn} value='10 September 2015' onCommit={fakeCommitCb} />);
    });

    it('should pass the formatted value date down to the DateRangePicker as a prop', () => {
      var DateRangePickerComponent = TestUtils.findRenderedComponentWithType(component, DateRangePickerStub);
      expect(DateRangePickerComponent.props.startDate).toBe('10 Sep 2015');
    });

    it('should pass the formated date down to the input as a placeholder', () => {
      expect(component.getInputNode().placeholder).toBe('10 Sep 2015');
    });
  });

  describe('With moment.IsDate(value)', () => {
    beforeEach(() => {
      var date = new Date(2015,8,10);
      component = TestUtils.renderIntoDocument(<SingleDateEditor column={fakeColumn} value={date} onCommit={fakeCommitCb} />);
    });

    it('should pass the formatted value date down to the DateRangePicker as a prop', () => {
      var DateRangePickerComponent = TestUtils.findRenderedComponentWithType(component, DateRangePickerStub);
      expect(DateRangePickerComponent.props.startDate).toBe('10 Sep 2015');
    });

    it('should pass the formated date down to the input as a placeholder', () => {
      expect(component.getInputNode().placeholder).toBe('10 Sep 2015');
    });
  });

  describe('With moment.IsMoment(value)', () => {
    beforeEach(() => {
      var date = new moment('9/10/15');
      component = TestUtils.renderIntoDocument(<SingleDateEditor column={fakeColumn} value={date} onCommit={fakeCommitCb} />);
    });

    it('should pass the formatted value date down to the DateRangePicker as a prop', () => {
      var DateRangePickerComponent = TestUtils.findRenderedComponentWithType(component, DateRangePickerStub);
      expect(DateRangePickerComponent.props.startDate).toBe('10 Sep 2015');
    });

    it('should pass the formated date down to the input as a placeholder', () => {
      expect(component.getInputNode().placeholder).toBe('10 Sep 2015');
    });
  });

});
