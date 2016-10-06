/* eslint-disable no-console */
import _ from 'underscore';
import React, { Component } from 'react';

const isRequiredUpdateObject = o => Array.isArray(o) || (o && o.constructor === Object.prototype.constructor);
const NOTIFY_LEVELS = { DEBUG: 0, WARNING: 1, NONE: 2 };
const isLogEnabled = lvl => lvl !== NOTIFY_LEVELS.NONE;
const isStatusTypeLoggable = (s, lvl) =>  s <= lvl;

const deepDiff = (o1, o2, p, notifyLevel) => {
  const notify = (status, statusType) => {
    if (isStatusTypeLoggable(statusType, notifyLevel)) {
      console.warn('Update %s', status);
      console.log('%cbefore', 'font-weight: bold', o1);
      console.log('%cafter ', 'font-weight: bold', o2);
    }
  };

  if (!_.isEqual(o1, o2)) {
    console.group(p);
    if ([o1, o2].every(_.isFunction)) {
      notify('avoidable?', NOTIFY_LEVELS.WARNING);
    } else if (![o1, o2].every(isRequiredUpdateObject)) {
      notify('required.', NOTIFY_LEVELS.DEBUG);
    } else {
      const keys = _.union(_.keys(o1), _.keys(o2));
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key);
      }
    }

    console.groupEnd();
  } else if (o1 !== o2) {
    console.group(p);
    notify('avoidable!', NOTIFY_LEVELS.WARNING);
    if (_.isObject(o1) && _.isObject(o2)) {
      const keys = _.union(_.keys(o1), _.keys(o2));
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key);
      }
    }
    console.groupEnd();
  }
};

const whyDidYouUpdate = (WrappedComponent, notifyLevel = NOTIFY_LEVELS.NONE) => {
  return class WhyDidYouUpdateComponentWrapper extends Component {
    componentDidUpdate(prevProps, prevState) {
      if (!isLogEnabled(notifyLevel)) {
        return;
      }

      deepDiff(
        { props: prevProps, state: prevState },
        { props: this.props, state: this.state },
        WrappedComponent.displayName,
        notifyLevel);
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default whyDidYouUpdate;
export { NOTIFY_LEVELS };
