import React from 'react';
import { connect } from '../stateManagement/state/RxState';
import initialState from '../stateManagement/state/initialState';

/* MapStateToProps */

const Mask = ({selectedPosition}) => {
  const {idx, rowIdx} = selectedPosition;
  const style = {
    position: 'absolute',
    height: 35,
    width: 150,
    zIndex: 1000,
    transform: `translate(${idx * 150}px, ${rowIdx * 35}px)`
  };
  return (<div style={style} className="rdg-selected"></div>);
};

const mapStateToProps = ({cell} = initialState) => {
  const {selectedPosition} = cell;
  return {
    selectedPosition
  };
};

module.exports = connect(mapStateToProps)(Mask);
