import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Observable} from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

export function createAction() {
  return new Subject();
}

export function createActions(actionNames) {
  return actionNames.reduce((akk, name) => ({ ...akk, [name]: createAction() }), {});
}

export function createState(reducer$, initialState$ = Observable.of({})) {
  return initialState$
    .merge(reducer$)
    .scan((state, [scope, reducer]) =>
      ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}

export function connect(selector = state => state, actionSubjects) {
  const actions = Object.keys(actionSubjects)
    .reduce((akk, key) => ({ ...akk, [key]: value => actionSubjects[key].next(value) }), {});

  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends Component {
      static contextTypes = {
        state$: PropTypes.object.isRequired
      };

      componentDidMount() {
        const {idx, rowIdx} = this.props;
        this.subscription = this.context.state$
        .map(selector)
        .filter(state => {
          return state && [idx, idx - 1, idx + 1].includes(state.selected.idx)
          && [rowIdx, rowIdx - 1, rowIdx + 1].includes(state.selected.rowIdx);
        })
        .subscribe(this.setState.bind(this));
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent {...this.state} {...this.props} {...actions} />
        );
      }
    };
  };
}

export class Provider extends Component {
  static propTypes = {
    state$: PropTypes.object.isRequired
  };

  static childContextTypes = {
    state$: PropTypes.object.isRequired
  };

  getChildContext() {
    return { state$: this.props.state$ };
  }

  render() {
    return this.props.children;
  }
}
