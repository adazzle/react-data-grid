/* TODO@flow mixins */
module.exports = {

  componentDidMount() {
    this._scrollLeft = this.refs.viewport.getScroll().scrollLeft;
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

  onScroll(props: {scrollLeft: number}) {
    if (this._scrollLeft !== props.scrollLeft) {
      this._scrollLeft = props.scrollLeft;
      this._onScroll();
    }
  },

  _onScroll() {
    if (this._scrollLeft !== undefined) {
      this.refs.header.setScrollLeft(this._scrollLeft);
      this.refs.viewport.setScrollLeft(this._scrollLeft);
    }
  }
};
