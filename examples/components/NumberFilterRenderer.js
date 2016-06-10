module.exports = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState(): {filterTerm: string} {
    return {filterTerm: '', filterCriterias:[]};
  },                                                 
      
  handleChange(e: Event) {
    let val = e.target.value;
    let spiltedFilterValues = val.split(",");         
    let filterCriterias = [];   
    if(isNaN(spiltedFilterValues)){
    for (let filterVal in spiltedFilterValues) {        
        if(spiltedFilterValues[filterVal]){       
            let contentString = spiltedFilterValues[filterVal];
            if(contentString.indexOf("-")!=-1){               
                let strSplit = contentString.split("-");
                let minNumber = parseFloat(strSplit[0]);
                let maxNumber = parseFloat(strSplit[1]);
                if(maxNumber){
                    if(maxNumber > minNumber){
                        filterCriterias.push({contentString:contentString, opr:"-", filterableNumber:minNumber, maxNumber:maxNumber});
                    }else{
                        filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:minNumber});
                    }
                }else{
                    filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:minNumber});
                }
            }else if(contentString.indexOf(">")!= -1){                       
                let strSplit = contentString.split(">");
                let filterableNumber = strSplit[1];  
                if(filterableNumber){
                    filterCriterias.push({contentString:contentString, opr:">", filterableNumber:filterableNumber});
                }else{
                    filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:filterableNumber});
                }
            }else if(contentString.indexOf("<")!= -1){       
                let filterableContent = contentString.split("<");
                let filterableNumber = filterableContent[1];  
                    if(filterableNumber){
                       filterCriterias.push({contentString:contentString, opr:"<", filterableNumber:filterableNumber});
                    }else{
                        filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:filterableNumber});
                    }
            }else{                                    
                filterCriterias.push({contentString:contentString, opr:"==", filterableNumber:contentString});
            }
        }
    }
    }else{        
        filterCriterias.push({contentString:val, opr:"==", filterableNumber:val});
    }
    this.setState({filterTerm: val, filterCriterias:filterCriterias});
    this.props.onChange({filterTerm: val, columnKey: this.props.column.key, filterCriterias:filterCriterias});
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
