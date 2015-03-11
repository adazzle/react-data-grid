/* @flow */
var React = require('react/addons');
var ReactGrid = require('../build/ReactGrid');
var FakeObjectDataStore   = require('./FakeObjectDataStore');
var QuickStartDescription = require('./components/QuickStartDescription');

var columns = [
{
  key: 'id',
  name: 'ID',
  width : 80
},
{
  key: 'avartar',
  name: 'Avartar',
  width : 60
},
{
  key: 'county',
  name: 'County',
  width : 200
},
{
  key: 'title',
  name: 'Title',
  width : 200
},
{
  key: 'firstName',
  name: 'First Name',
  width : 200
},
{
  key: 'lastName',
  name: 'Last Name',
  width : 200
},
{
  key: 'email',
  name: 'Email',
  width : 200
},
{
  key: 'street',
  name: 'Street',
  width : 200
},
{
  key: 'zipCode',
  name: 'ZipCode',
  width : 200
},
{
  key: 'date',
  name: 'Date',
  width : 200
},
{
  key: 'bs',
  name: 'bs',
  width : 200
},
{
  key: 'catchPhrase',
  name: 'Catch Phrase',
  width : 200
},
{
  key: 'companyName',
  name: 'Company Name',
  width : 200
},
{
  key: 'words',
  name: 'Words',
  width : 200
},
{
  key: 'sentence',
  name: 'Sentence',
  width : 200
}
]

var Example = React.createClass({

  render:function(): ?ReactElement {
    return(
      <div>
        <QuickStartDescription title="A Simple Example"/>
        <ReactGrid rowGetter={FakeObjectDataStore.getObjectAt} rowsCount={1000} columns={columns}/>
      </div>
      )
  }

});

module.exports = Example;
