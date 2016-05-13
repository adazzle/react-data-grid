
var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var SimpleExample = `

var _rows = [
        {
            folder: true,
            open: true,
            name: 'C:',
            children: [
                {folder: true,
                    name: 'Windows',
                    size: '',
                    type: 'File Folder',
                    dateModified: '27/02/2014 04:12',
                    children: [
                        {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                        {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                        {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                    ]
                },
                {folder: true,
                    name: 'Program Files',
                    size: '',
                    type: 'File Folder',
                    dateModified: '11/09/2013 02:11',
                    open: true,
                    children: [
                        {folder: true,
                            name: 'ASUS',
                            size: '',
                            type: 'File Folder',
                            dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'Classic Shell', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'Common Files', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'DisplayLink Core Software', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'Intel', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'Internet Explorer', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'Intel Corporation', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        },
                        {folder: true,
                            name: 'Java', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                            open: true,
                            children: [
                                {folder: true,
                                    name: 'jdk1.8.0', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                    children: [
                                        {name: 'java.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                        {name: 'javac.exe', size: '1 kb', type: 'Application', dateModified: '27/11/2012 04:12'},
                                        {name: 'weblaunch.exe', size: '21 kb', type: 'Application', dateModified: '18/03/2014 00:56'}
                                    ]
                                },
                                {folder: true,
                                    name: 'jre1.8.0_31', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                    children: [
                                        {name: 'java.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                        {name: 'javac.exe', size: '1 kb', type: 'Application', dateModified: '27/11/2012 04:12'},
                                        {name: 'weblaunch.exe', size: '21 kb', type: 'Application', dateModified: '18/03/2014 00:56'}
                                    ]
                                },
                                {name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14'},
                                {name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                                {name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56'}
                            ]
                        }
                    ]},
                {group: false, name: 'boot.ini', size: '16 kb', type: 'Boot File', dateModified: '27/11/2012 04:12'},
                {group: false, name: 'system.cfg', size: '13 kb', type: 'System File', dateModified: '18/03/2014 00:56'}
            ]
        },
        {
            folder: true,
            name: 'D:',
            children: [
                {name: 'Game of Thrones s05e01.avi', size: '1034 mb', type: 'Movie', dateModified: '13/03/2014 10:14'},
                {name: 'The Knick s01e01', size: '523 mb', type: 'Text Document', dateModified: '27/11/2012 04:12'},
                {name: 'musicbackup1.zip', size: '25 mb', type: 'Compressed Zip File', dateModified: '18/03/2014 00:56'},
                {name: 'musicbackup2.zip', size: '25 mb', type: 'Compressed Zip File', dateModified: '18/03/2014 00:56'}
            ]
        }
    ];



//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'name',
  name: 'Name'
},
{
  key: 'size',
  name: 'Size'
},
{
  key: 'type',
  name: 'Type'
},
{
  key: 'dateModified',
  name: 'Date Modified'
}
]

var Example = React.createClass({
    
  getInitialState() {
    return {expanded: {}, rowCount: _rows.length}
  },
  
  getSubRowDetails(rowItem, index) {
    var isExpanded = this.state.expanded[rowItem.name] ? this.state.expanded[rowItem.name] : false;
    if (rowItem.folder) {
        return {
            group: true,
            expanded: isExpanded,
            children: rowItem.children,
            field: 'name'
        };
    } else {
        return null;
    }
  },
    
  onCellExpand(args) {
   let rowKey = args.rowData.name;
   let rowCount = this.state.rowCount;
   let expanded = Object.assign({}, this.state.expanded);
   if(this.state.expanded && !expanded[rowKey]) {
     expanded[rowKey] = !args.expandArgs.expanded;
     rowCount += args.expandArgs.children.length;
   } else if (expanded[rowKey]){
     delete expanded[rowKey];
     rowCount -= args.expandArgs.children.length;
   }
   this.setState({expanded: expanded, rowCount: rowCount});
  },
  
  render: function() {
    return  (<ReactDataGrid
    enableCellSelect={true}
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={this.state.rowCount}
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
