/**
* @jsx React.DOM
*/


/*jslint node: true*/
'use strict';
var React         = require('react');
var AutoCompleteEditor  = require('./AutoCompleteEditor');

var AutoCompleteAsyncEditor =  React.createClass({

  propTypes : {
  	column: React.PropTypes.object,
  	editorRowMetaData: React.PropTypes.object,
	label: React.PropTypes.string,
	searchSourceArgs: React.PropTypes.object
  },

  getSearchParams() {
    var editorRowMetaData = this.props.editorRowMetaData;
    var searchParams =  this.props.searchSourceArgs.map(arg => {
      if(!editorRowMetaData[arg]){
        throw ("Cannot find Search Source Paramater " + arg + " in editorRowMetaData. You must add an entry for this in models/GridColumn.js")
      }
      return editorRowMetaData[arg]
    });
    return searchParams;
  },

  getInputNode(): HTMLInputElement{
    return this.getDOMNode().getElementsByTagName("input")[0];
  },

  getValue(){
    return this.refs.autocomplete.getValue();
  },

  hasResults(){
    return this.refs.autocomplete.hasResults();
  },

  _searchRemote(options, searchTerm, cb) {
    var searchParams = this.getSearchParams();
    //add onSuccessCallback at end of search params array
    searchParams.push(this._onXHRSuccess.bind(null, cb, searchTerm));
    this.props.searchUrl.apply(this, searchParams);
  },

  _onXHRSuccess(cb, searchTerm, data, status, xhr) {
    cb(null, this._filterData(data, searchTerm))
  },

  _onXHRError(cb, xhr, status, err) {
    cb(err)
  },

  _filterData(data, searchTerm) {
    var regexp = new RegExp(searchTerm, 'i')
    var results = []
    var label = this.props.label ? this.props.label : 'title';
    for (var i = 0, len = data.length; i < len; i++) {
      if (regexp.exec(data[i][label])) {
        results.push(data[i])
      }
    }
    return results.slice(0, 100)
  },
	  
  render() {
    var value = typeof this.props.column.formatter === 'function' ? this.props.column.formatter(this.props) : this.props.value;
    return (
      <AutoCompleteEditor 
		ref="autocomplete" {...this.props} 
		options={[]} 
		search={this._searchRemote} 
		value={value} 
		label={this.props.label} 
		resultIdentifier={this.props.resultIdentifier}
	  />
    )
  }
});

module.exports = AutoCompleteAsyncEditor;
