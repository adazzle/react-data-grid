const OWNER_COMPONENT_KEY = 'Owner > component';
const WASTED_TIME_KEY = 'Wasted time (ms)';
const WASTED_INSTANCES_KEY = 'Instances';

class SummaryItemModel {
  constructor(summary) {
    if (typeof summary === 'object') {
      this._createModel(summary);
    } else {
      this._createEmptyModel(summary);
    }
  }

  _createModel(summary) {
    let { owner, component } = this._getComponentAndOwner(summary);
    this.owner = owner;
    this.component = component;
    this.wastedInstances = summary[WASTED_INSTANCES_KEY];
    this.wastedTime = summary[WASTED_TIME_KEY];
  }

  _createEmptyModel(componentName) {
    this.owner = componentName;
    this.component = componentName;
    this.wastedInstances = 0;
    this.wastedTime = 0;
  }

  _getComponentAndOwner(summary) {
    let ownerAndComponent = summary[OWNER_COMPONENT_KEY];
    let splitOwnerComponent = ownerAndComponent.split('>');

    return {
      owner: splitOwnerComponent[0].trim(),
      component: splitOwnerComponent[1].trim()
    };
  }
}

export default SummaryItemModel;
