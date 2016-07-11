const ReactDOM = require('react-dom');

module.exports = {

  componentDidMount() {
    this._scrollLeft = this.refs.viewport ? this.refs.viewport.getScroll().scrollLeft : 0;
    this._onScroll();
  },

  componentDidUpdate() {
    this._onScroll();
  },

  componentWillMount() {
    this._scrollLeft = undefined;
  },

  componentWillUnmount() {
    this._scrollLeft = undefined;
  },

  onScroll(props) {
    if (this._scrollLeft !== props.scrollLeft) {
      this._scrollLeft = props.scrollLeft;
      this._onScroll();
    }
  },

  onHeaderScroll(e) {
    let scrollLeft = e.target.scrollLeft;
    if (this._scrollLeft !== scrollLeft) {
      this._scrollLeft = scrollLeft;
      this.refs.header.setScrollLeft(scrollLeft);
      let canvas = ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);
      canvas.scrollLeft = scrollLeft;
      this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);
    }
  },

  _onScroll() {
    if (this._scrollLeft !== undefined) {
      this.refs.header.setScrollLeft(this._scrollLeft);
      if (this.refs.viewport) {
        this.refs.viewport.setScrollLeft(this._scrollLeft);
      }
    }
  }
};
