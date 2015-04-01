
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var DateRangeFilter         = require('./widgets/DateRangeFilter');
var Moment                  = require('moment');

type DateRangeValue = { startDate: Date; endDate: Date};

var DateRangeEditor = React.createClass({

  PropTypes : {
    format : React.PropTypes.string,
    ranges : React.PropTypes.arrayOf(React.PropTypes.string),
    value : React.PropTypes.shape({
      startDate: React.PropTypes.Date.isRequired,
      endDate: React.PropTypes.Date.isRequired
    }).isRequired
  },

  getDefaultProps(): {format: string; ranges: Array<Date>}{
    return {
      format   : "YYYY-MM-DD",
      ranges   : []
    }
  },

  rangeSeparatorChar : ' - ',

  overrides : {
      checkFocus : function(){
          this.setTextInputFocus();
      },
      getInputNode(): HTMLElement{
        return this.refs.datepicker.getDOMNode();
      },
      getValue(): DateRangeValue{
        var dateToParse = this.getInputNode().value;
        var dateRanges = dateToParse.split(this.rangeSeparatorChar);
        if(dateRanges.length !== 2){
          throw ("DateRangeEditor.getValue error : " + dateToParse + " is not in the correct format");
        }
        return {startDate : dateRanges[0].trim(), endDate : dateRanges[1].trim()}
      }
  },

  isDateValid(date: Date): boolean{
    return Moment(date, this.props.format, true).isValid();
  },

  validate(value: DateRangeValue): boolean{
    return this.isDateValid(value.startDate)
    && this.isDateValid(value.endDate)
    && (Moment(value.startDate, this.props.format).isBefore(value.endDate)
    || Moment(value.startDate, this.props.format).isSame(value.endDate));
  },

  handleDateFilterApply(startDate: string, endDate: string){
    this.commit({value : {startDate : startDate, endDate : endDate}});
  },

  render(): ?ReactElement{
    return (
      <div style={this.getStyle()} onKeyDown={this.onKeyDown}>
        <DateRangeFilter ref="datepicker" onApply={this.handleDateFilterApply}  format={this.props.format} ranges={this.props.ranges} startDate={this.props.value.startDate} endDate={this.props.value.endDate} />
      </div>
    );
  }

});

module.exports = DateRangeEditor;
