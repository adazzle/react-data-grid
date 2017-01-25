import React, {PropTypes} from 'react';

class ExampleList extends React.Component {
  render() {
    let links = this.props.links.map(l => {
      return <li key={l.hashLocation}><a href={`examples.html#/${l.hashLocation}`}>{l.name}</a></li>;
    });
    return (
      <ul {...this.props}>
        {links}
      </ul>
    );
  }
}

ExampleList.propTypes = {
  links: PropTypes.array.isRequired
};

export default ExampleList;
