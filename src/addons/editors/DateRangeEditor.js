
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var DateRangePicker         = require('react-bootstrap-daterangepicker');
var ExcelColumn             = require('../grids/ExcelColumn');
var moment                  = require('moment');

var DateRangeEditor = React.createClass({

  PropTypes : {
    onKeyDown : React.PropTypes.func.isRequired,
    value : React.PropTypes.any.isRequired,
    onBlur : React.PropTypes.func.isRequired,
    column :  React.PropTypes.shape(ExcelColumn).isRequired
  },

  getDefaultProps(): {format: string; defaultValue: string}{
    return {
      format       : 'DD MMM YYYY',
      defaultValue : new moment().format('DD MMM YYYY')
    }
  },

  validate(toCommit): bool{
    var key = this.props.column.key;
    if (toCommit[key] !== '') {
      var value = new moment(toCommit[key], 'DD MMM YYYY', true);
      return value.isValid();
    }
    return true;
  },

  getValue(): any{
    var updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  },

  getInputNode(): HTMLInputElement{
    return this.getDOMNode().querySelector('input');
  },

  componentDidMount(): any{
    // for some reason the widget doesn't display on it's own
    // maybe because it's nested?
    var widget = document.querySelector('.daterangepicker');
    if (widget) {
      widget.style.display = "block";
    }
  },

  handleEvent: function (event, picker) {
    switch(event.type) {
      case 'apply':
        var formattedDate = this.formatDate(picker.startDate);
        this.getInputNode().value = formattedDate;
        this.props.onCommit({key : 'Enter'});
        break;
    }
  },

  formatDate(date){
    if(typeof date === 'string' && date !== ''){
      return new moment(date).format(this.props.format);
    }
    if(moment.isMoment(date)){
      return date.format(this.props.format);
    }
    if(typeof date === 'string' && date === '' || typeof date === 'undefined'){
      return this.props.defaultValue;
    }
    return date;
  },

  render(): ?ReactElement{
    var formattedDate = this.formatDate(this.props.value);
    return (
      <DateRangePicker
      ref="dataPicker"
      format={this.props.format}
      startDate={formattedDate}
      singleDatePicker={true}
      onEvent={this.handleEvent}>
        <input defaultValue={this.props.value} placeholder={formattedDate}></input>
      </DateRangePicker>
    );
  }

});

module.exports = DateRangeEditor;
