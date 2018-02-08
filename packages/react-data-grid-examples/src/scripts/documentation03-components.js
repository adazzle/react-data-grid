import React from 'react';
import PropTypes from 'prop-types';

const markdown = require('markdown');

class DocumentContainer extends React.Component {
  static propTypes = {
    documentContent: PropTypes.string.isRequired,
    documentName: PropTypes.string.isRequired,
    documentPath: PropTypes.string.isRequired
  };

  getHtml() {
    return { __html: this.getMarkdownAsHtml() };
  }

  getMarkdownAsHtml() {
    return markdown.parse(this.props.documentContent);
  }

  render() {
    return (
      <div className={'pull-left'} style={{ marginLeft: '100px' }}>
        <h3>{this.props.documentName}</h3>
        <div dangerouslySetInnerHTML={this.getHtml()}></div>
      </div>
    );
  }
}

class ComponentDocs extends React.Component {
  state = { selectedDocumentIndex: 0, documentContent: '' };

  componentDidMount() {
    this.getDocumentContent(0);
  }

  getDocumentContent = (key) => {
    const documentPath = generatedDocs[key].path;
    $.ajax({
      url: documentPath,
      success: (documentContent) => {
        this.setState({ documentContent: documentContent, selectedDocumentIndex: key });
      }
    });
  };

  onNavBarClicked = (key, e) => {
    this.getDocumentContent(key);
    e.preventDefault();
  };

  getComponentDocs() {
    const docsToRender = [];
    for (const key in generatedDocs) {
      if (generatedDocs.hasOwnProperty(key)) {
        const className = key === this.state.selectedDocumentIndex ? 'active' : '';
        const doc = generatedDocs[key];
        docsToRender.push(
          <li key={key} role="presentation" className={className}>
            <a href="#" onClick={function(index, e) { this.onNavBarClicked(index, e); }.bind(this, key)}>{doc.name}</a>
          </li>);
      }
    }

    return docsToRender;
  }

  renderNavBar() {
    return (
      <ul className="nav nav-pills nav-stacked pull-left">
        {this.getComponentDocs()}
      </ul>
    );
  }

  render() {
    const selectedDocumentIndex = this.state.selectedDocumentIndex;
    return (
      <div>
        <h1 id="js-api-refernce">Components Docs</h1>
        {this.renderNavBar()}
        <DocumentContainer
          documentContent={this.state.documentContent}
          documentName={generatedDocs[selectedDocumentIndex].name}
          documentPath={generatedDocs[selectedDocumentIndex].path} />
      </div>
    );
  }
}


module.exports = ComponentDocs;
