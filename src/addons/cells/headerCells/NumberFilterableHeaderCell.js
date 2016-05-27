const React              = require('react');
const ExcelColumn        = require('../../grids/ExcelColumn');

const NumberFilterableHeaderCell = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    column: React.PropTypes.shape(ExcelColumn)
  },

  getInitialState(): {filterTerm: string} {
    return {filterTerm: '', filterArray:[]};
  },                                                 
      
  handleChange(e: Event) {
    let val = e.target.value;
    var tmpStrArray = val.split(",");        
    var tmpCurrentState = []; 
    var filterArray = [];
   
    if(isNaN(tmpStrArray)){
    for (var tmpStrArrayVal in tmpStrArray) {        
        if(tmpStrArray[tmpStrArrayVal]){       
            var contentString = tmpStrArray[tmpStrArrayVal];
            if(contentString.indexOf("-")!=-1){               
                var strSplit = contentString.split("-");
                var firstNumber = parseInt(strSplit[0]);
                var secondNumber = parseInt(strSplit[1]);
                if(secondNumber){
                    if(secondNumber > firstNumber){
                        filterArray.push({contentString:contentString, opr:"-", firstNumber:firstNumber, secondNumber:secondNumber});
                    }else{
                        filterArray.push({contentString:contentString, opr:"string", firstNumber:firstNumber});
                    }
                }else{
                    filterArray.push({contentString:contentString, opr:"string", firstNumber:firstNumber});
                }
            }else if(contentString.indexOf(">")!= -1){                       
                var strSplit = contentString.split(">");
                var firstNumber = strSplit[1];  
                if(firstNumber){
                    filterArray.push({contentString:contentString, opr:">", firstNumber:firstNumber});
                }else{
                    filterArray.push({contentString:contentString, opr:"string", firstNumber:firstNumber});
                }
            }else if(contentString.indexOf("<")!= -1){       
                var strSplit = contentString.split("<");
                var firstNumber = strSplit[1];  
                    if(firstNumber){
                       filterArray.push({contentString:contentString, opr:"<", firstNumber:firstNumber});
                    }else{
                        filterArray.push({contentString:contentString, opr:"string", firstNumber:firstNumber});
                    }
            }else{                                    
                filterArray.push({contentString:contentString, opr:"string", firstNumber:contentString});
            }
        }
    }
    }else{        
        filterArray.push({contentString:val, opr:"string", firstNumber:val});
    }
    this.setState({filterTerm: val, filterArray:filterArray});
    this.props.onChange({filterTerm: val, columnKey: this.props.column.key, filterArray:filterArray});
  },

  renderInput: function(): ?ReactElement {
    if (this.props.column.numberfilterable === false) {
      return <span/>;
    }

    let inputKey = 'header-filter-' + this.props.column.key;
    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
});

module.exports = NumberFilterableHeaderCell;
