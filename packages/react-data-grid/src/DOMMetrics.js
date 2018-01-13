const shallowCloneObject  = require('./shallowCloneObject');
import PropTypes from 'prop-types';

let contextTypes = {
  metricsComputator: PropTypes.object
};

let MetricsMixin = {

  contextTypes: contextTypes,

  componentWillMount() {
    if (this.DOMMetrics) {
      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

      this.DOMMetrics = {};
      for (let name in this._DOMMetricsDefs) {
        if (!this._DOMMetricsDefs.hasOwnProperty(name)) continue;

        this.DOMMetrics[name] = () => {};
      }
    }
  },

  componentDidMount() {
    if (this.DOMMetrics) {
      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
    }
  },

  componentWillUnmount(): any {
    if (!this.registerMetricsImpl) {
      return this.context.metricsComputator.unregisterMetricsFor(this);
    }
    if (this.hasOwnProperty('DOMMetrics')) {
      delete this.DOMMetrics;
    }
  },

  registerMetrics(metrics: any): any {
    if (this.registerMetricsImpl) {
      return this.registerMetricsImpl(this, metrics);
    }

    return this.context.metricsComputator.registerMetricsImpl(this, metrics);
  },

  getMetric(name: string): any {
    if (this.getMetricImpl) {
      return this.getMetricImpl(name);
    }

    return this.context.metricsComputator.getMetricImpl(name);
  }
};

module.exports = {
  MetricsMixin
};
