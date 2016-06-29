var DocumentContainer = React.createClass({
  propTypes: {
    documentContent: React.PropTypes.string.isRequired,
    documentName: React.PropTypes.string.isRequired,
    documentPath: React.PropTypes.string.isRequired
  },

  getHtml() {
    return { __html: this.getMarkdownAsHtml() };
  },

  getMarkdownAsHtml() {
    return markdown.toHTML(this.props.documentContent);
  },

  render: function() {
    return (
      <div className={'pull-left'} style={ {marginLeft: '100px'} }>
        <h3>{ this.props.documentName }</h3>
        <div dangerouslySetInnerHTML={ this.getHtml() }></div>
      </div>);
  }
});

var ComponentDocs = React.createClass({
  getInitialState: function() {
    return { selectedDocumentIndex: 0, documentContent: '' };
  },

  componentDidMount() {
    this.getDocumentContent(0);
  },

  getDocumentContent(key) {
    var documentPath = generatedDocs[key].path;
    $.ajax({
      url: documentPath,
      success: function(documentContent) {
        this.setState({ documentContent: documentContent, selectedDocumentIndex: key });
      }.bind(this)
    });
  },

  onNavBarClicked: function(key, e) {
    this.getDocumentContent(key);
    e.preventDefault();
  },

  getComponentDocs: function() {
    var docsToRender = [];
    for (var key in generatedDocs) {
      if (generatedDocs.hasOwnProperty(key)) {
        var className = key === this.state.selectedDocumentIndex ? 'active' : '';
        var doc = generatedDocs[key];
        docsToRender.push(
          <li role="presentation" className={className}>
            <a href="#" onClick={function(index, e) { this.onNavBarClicked(index, e); }.bind(this, key) }>{doc.name}</a>
          </li>);
      }
    }

    return docsToRender;
  },

  renderNavBar() {
    return (
      <ul className="nav nav-pills nav-stacked pull-left">
        { this.getComponentDocs() }
      </ul>);
  },

  render: function() {
    var selectedDocumentIndex = this.state.selectedDocumentIndex;
    return (
      <div>
        <h1 id="js-api-refernce">Components Docs</h1>
        { this.renderNavBar() }
        <DocumentContainer
          documentContent={this.state.documentContent}
          documentName={generatedDocs[selectedDocumentIndex].name}
          documentPath={generatedDocs[selectedDocumentIndex].path}/>
      </div>
    );
  }
});


module.exports = ComponentDocs;
