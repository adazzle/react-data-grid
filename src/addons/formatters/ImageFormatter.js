var React = require('react');

var PendingPool = {};
var ReadyPool = {};

var ImageFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      ready: false,
    };
  },

  componentWillMount() {
    this._load(this.props.value);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: null});
      this._load(nextProps.value);
    }
  },

  render() {
    var style = this.state.value ?
    { backgroundImage : 'url(' + this.state.value + ')'} :
    undefined;

    return <div className="react-grid-image" style={style} />;
  },

  _load(/*string*/ src) {
    if (ReadyPool[src]) {
      this.setState({value: src});
      return;
    }

    if (PendingPool[src]) {
      PendingPool[src].push(this._onLoad);
      return;
    }

    PendingPool[src] = [this._onLoad];

    var img = new Image();
    img.onload = () => {
      PendingPool[src].forEach(/*function*/ callback => {
        callback(src);
      });
      delete PendingPool[src];
      img.onload = null;
      src = undefined;
    };
    img.src = src;
  },

  _onLoad(/*string*/ src) {
    if (this.isMounted() && src === this.props.value) {
      this.setState({
        value: src,
      });
    }
  },
});


module.exports = ImageFormatter;
