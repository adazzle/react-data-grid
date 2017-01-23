import SummaryItemModel from './SummaryItemModel';

class SummaryParser {
  constructor(summary) {
    this._summary = this._parseSummary(summary);
    this.getByOwner = this.getByOwner.bind(this);
    this.getSumByOwner = this.getSumByOwner.bind(this);
    this.getByComponent = this.getByComponent.bind(this);
  }

  _parseSummary(summary) {
    return summary.map(s => new SummaryItemModel(s));
  }

  getByOwner(ownerName) {
    return this._summary.filter(s => s.owner === ownerName);
  }

  getSumByOwner(ownerName) {
    let summaryItemsByOwner = this.getByOwner(ownerName);
    let summaryItem = new SummaryItemModel(ownerName);

    summaryItemsByOwner.forEach(s => {
      let { wastedTime, wastedInstances } = summaryItem;
      summaryItem.wastedTime = wastedTime + s.wastedTime;
      summaryItem.wastedInstances = wastedInstances + s.wastedInstances;
    });

    return summaryItem;
  }

  getByComponent(component) {
    let componentSummaryItem = this._summary.filter(s => s.component === component);

    if (componentSummaryItem.length > 1) {
      throw new Error(`More then 1 result retrived for ${component}`);
    }

    if (componentSummaryItem.length === 0) {
      let emptySummary = new SummaryItemModel(component);
      componentSummaryItem = [emptySummary];
    }

    return componentSummaryItem[0];
  }
}

export default SummaryParser;
