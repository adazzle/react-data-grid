import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Observable} from 'rxjs/Observable';
import initialState from './InitialState';
import { Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

export function createAction() {
  return new Subject();
}

export function createActions(actionNames) {
  return actionNames.reduce((akk, name) => ({ ...akk, [name]: createAction() }), {});
}

export function createState(reducer$, initialState$ = Observable.of(initialState)) {
  return initialState$
    .merge(reducer$)
    .scan((state, [scope, reducer]) =>
      ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}

export function connect(mapStateToProps, actionSubjects = [], subscribeFilter = () => () => true) {
  const actions = Object.keys(actionSubjects)
    .reduce((akk, key) => ({ ...akk, [key]: value => actionSubjects[key].next(value) }), {});

  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends Component {
      static contextTypes = {
        state$: PropTypes.object.isRequired
      };

      componentDidMount() {
        this.subscription = this.context.state$
        .filter(subscribeFilter(this.props))
        .throttleTime(17)
        .subscribe(this.setState.bind(this));
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent {...mapStateToProps(this.state || undefined, this.props)} {...this.props} {...actions} />
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
