var DocumentContainer = React.createClass({
  propTypes: {
    documentName: React.PropTypes.string.isRequired,
    documentPath: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    this.getDocumentContent();
  },

  componentDidUpdate() {
    this.getDocumentContent();
  },

  getInitialState() {
    return { documentContent: 'Loading'};
  },

  getDocumentContent() {
    $.ajax({
      url: this.props.documentPath,
      success: function(documentContent) {
        this.setState({ documentContent: this.getMarkdownAsHtml(documentContent) });
      }.bind(this)
    });
  },

  getHtml(content) {
    return { __html: content };
  },

  getMarkdownAsHtml(documentContent) {
    return markdown.toHTML(documentContent);
  },

  render: function() {
    return (
      <div>
        <h3>{ this.props.documentName }</h3>
        <div dangerouslySetInnerHTML={ this.getHtml(this.state.documentContent) }></div>
      </div>);
  }
});

var ComponentDocs = React.createClass({
  getInitialState: function() {
    return { selectedDocumentIndex: 0 };
  },

  onNavBarClicked: function(key, e) {
    this.setState({ selectedDocumentIndex: key });
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
      <ul className="nav nav-tabs">
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
          documentName={generatedDocs[selectedDocumentIndex].name}
          documentPath={generatedDocs[selectedDocumentIndex].path}/>
      </div>
    );
  }
});


module.exports = ComponentDocs;
