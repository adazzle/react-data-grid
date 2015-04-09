
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var DateRangePicker         = require('react-bootstrap-daterangepicker');
var ExcelColumn             = require('../grids/ExcelColumn');

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

  getValue(): any{
    var updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  },

  getInputNode(): HTMLInputElement{
    return this.getDOMNode().querySelector('input');
  },

  componentWillMount(): any{
    if (!this.props.value) {
      this.props.value = this.props.defaultValue;
    }
  },

  componentDidMount(): any{
    //reposition the widget -- a hack but means it doesn't move
    var $picker = $('.daterangepicker');
    var currentTop = parseInt($picker.css('top').replace('px',''))
    var newTop = currentTop + 23;
    $picker.css('top', newTop);
    $('.daterangepicker').show();
  },

  componentWillUnmount(): any{
    this.props.onCommit({key : 'Enter'});
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
