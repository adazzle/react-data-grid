/* TODO@flow */
var Highlight = require('highlight.js');
module.exports = {
  componentDidMount : function(){
    this.highlight();
  },

  componendDidUpdate : function(){
    this.highlight();
  },

  highlight : function(){
    var aCodes = document.getElementsByTagName('pre');
    for (var i=0; i < aCodes.length; i++) {
      Highlight.highlightBlock(aCodes[i]);
    }
  }
}
