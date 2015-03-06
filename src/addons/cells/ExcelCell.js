// /* @flow */
// /**
//  * @jsx React.DOM
//
//
//  */
// 'use strict';
//
// var React                = require('react/addons');
// var BaseCell             = require('../../Cell');
// var EditableMixin        = require('./mixins/EditableMixin');
// var CopyableMixin        = require('./mixins/CopyableMixin');
// var DraggableMixin       = require('./mixins/DraggableMixin');
// var MixinHelper          = require('../utils/MixinHelper');
// var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
// var isFunction           = require('../utils/isFunction');
// var PropTypes            = React.PropTypes;
// var cx                   = React.addons.classSet;
// var cloneWithProps       = React.addons.cloneWithProps;
// var ExcelColumn          = require('../grids/ExcelColumn');
//
//
// var CellControls = React.createClass({
//
//   propTypes : {
//     column : React.PropTypes.shape(ExcelColumn).isRequired,
//     onClickEdit : React.PropTypes.func.isRequired,
//     onShowMore : React.PropTypes.func.isRequired,
//     onShowLess : React.PropTypes.func.isRequired,
//     height : React.PropTypes.number.isRequired,
//     value : React.PropTypes.any.isRequired,
//     rowIdx : React.PropTypes.number.isRequired
//   },
//
//   onClickEdit : function(e: Event){
//     e.stopPropagation();
//     e.preventDefault();
//     this.props.onClickEdit();
//   },
//
//   onShowMore : function(e: Event){
//     e.stopPropagation();
//     e.preventDefault();
//     var newHeight = this.props.column.getExpandedHeight(this.props.value);
//     this.props.onShowMore(this.props.rowIdx, newHeight);
//   },
//
//   onShowLess : function(e: Event){
//     e.stopPropagation();
//     e.preventDefault();
//     this.props.onShowLess(this.props.rowIdx);
//   },
//
//   shouldComponentUpdate(nextProps: any, nextState: any){
//     return this.props.height != nextProps.height;
//   },
//
//   renderShowMoreButton(): ?ReactElement {
//     if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
//       var newHeight = this.props.column.getExpandedHeight(this.props.value);
//       if(newHeight > this.props.height){
//         return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowMore}>Show More</button>
//       }else{
//         return <button type="button" className="btn btn-link btn-xs" onClick={this.onShowLess}>Show Less</button>
//       }
//     }else{
//       return null;
//     }
//   },
//
//   render : function(): ?ReactElement {
//     return (<div className="pull-right btn-group">
//               {this.renderShowMoreButton()}
//               <button onClick={this.onClickEdit} type="button" className="btn btn-link btn-xs">Edit</button>
//             </div>)
//   }
//
// })
//
//
// var ExcelCell = React.createClass({
//
//     mixins : [SelectableMixin],
//
//     getCellClass : function(){
//       return cx({
//         'selected' : this.isSelected()
//       });
//     },
//
//   isActiveDragCell : function(): boolean{
//     return (this.isSelected() || this.isDraggedOver()) && !this.isActive();
//   },
//
//   isExpanded : function(): boolean{
//     var isExpanded = false;
//     if(isFunction(this.props.column.getExpandedHeight) && this.props.column.getExpandedHeight(this.props.value) > 0){
//       var newHeight = this.props.column.getExpandedHeight(this.props.value);
//       if(this.props.height >= newHeight){
//         isExpanded = true;
//       }else{
//         isExpanded = false;
//       }
//     }
//     return isExpanded;
//   },
//
//
//   shouldComponentUpdate(nextProps: any, nextState: any): boolean {
//     return this.props.column.width !== nextProps.column.width
//     || this.props.value !== nextProps.value
//     || this.props.height !== nextProps.height
//     || this.props.rowIdx !== nextProps.rowIdx
//     || this.isCellSelectionChanging(nextProps);
//   },
//
//
//   render: function(): ?ReactElement {
//     return (
//       <BaseCell
//         {...this.props}
//         className={this.getCellClass()}
//         onClick={this.onClick}
//         onDoubleClick={this.onDoubleClick}
//         formatter={this.getFormatter()}
//         handleDragStart={this.handleDragStart}
//         onDragEnter={this.handleDragEnter}
//         onDragEnd={this.props.handleDragEnd}
//         cellControls={this.props.column.showCellControls && !this.isActive() ? <CellControls height={this.props.height} value={this.props.value} rowIdx={this.props.rowIdx} column={this.props.column} onShowMore={this.props.onShowMore} onShowLess={this.props.onShowLess} onClickEdit={this.setActive}/> : null}
//         isExpanded={this.isExpanded()}
//       />)
//   }
//
// })
//
// module.exports = ExcelCell;
