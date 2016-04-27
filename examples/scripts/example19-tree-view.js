
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var SimpleExample = `

var _rows = [
    {group: 'Group A',
        participants: [
        {athlete: 'Michael Phelps', year: '2008', country: 'United States'},
        {athlete: 'Michael Phelps', year: '2008', country: 'United States'},
        {athlete: 'Michael Phelps', year: '2008', country: 'United States'}
    ]},
    {group: 'Group B', athlete: 'Sausage', year: 'Spaceman', country: 'Winklepicker',
        participants: [
        {athlete: 'Natalie Coughlin', year: '2008', country: 'United States'},
        {athlete: 'Missy Franklin ', year: '2012', country: 'United States'},
        {athlete: 'Ole Einar Qjorndalen', year: '2002', country: 'Norway'},
        {athlete: 'Marit Bjorgen', year: '2010', country: 'Norway'},
        {athlete: 'Ian Thorpe', year: '2000', country: 'Australia'}
    ]},
    {group: 'Group C',
        participants: [
        {athlete: 'Janica Kostelic', year: '2002', country: 'Crotia'},
        {athlete: 'An Hyeon-Su', year: '2006', country: 'South Korea'}
    ]}
];


//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'group',
  name: 'Group'
},
{
  key: 'athlete',
  name: 'athlete'
},
{
  key: 'year',
  name: 'year'
},
{
  key: 'country',
  name: 'country'
}
]

var Example = React.createClass({
    
  getInitialState() {
    return {expanded: {}}
  },

  getSubRowDetails(rowItem, index) {
    var isExpanded = this.state.expanded[rowItem.group] ? this.state.expanded[rowItem.group] : false;
    if (rowItem.group) {
        return {
            expanded: isExpanded,
            children: rowItem.participants,
            field: 'group'
        };
    } else {
        return null;
    }
  },
    
  onCellExpand(args) {
   let rowKey = args.rowData.group;
   let expanded = Object.assign({}, this.state.expanded);
   if(this.state.expanded) {
     expanded[rowKey] = args.expanded;
   } else if (expanded[rowKey]){
     delete expanded[rowKey];
   }
   this.setState({expanded: expanded});
  },
  
  render: function() {
    return  (<ReactDataGrid
    enableCellSelect={true}
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    getSubRowDetails={this.getSubRowDetails}
    minHeight={500}
    onCellExpand={this.onCellExpand} />);
  }
});
ReactDOM.render(<Example />, mountNode);
`;

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <h3>Tree View Example</h3>
        <ReactPlayground codeText={SimpleExample} />
      </div>
    )
  }

});
