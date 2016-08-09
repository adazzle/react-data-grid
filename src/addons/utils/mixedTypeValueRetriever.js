export default class RowValueRetriever {
  constructor(isImmutable) {
    const retriever = (item, key) => { return item[key]; };
    const immutableRetriever =  (immutable, key) => { return immutable.get(key); };

    this.getValue = isImmutable ? immutableRetriever : retriever;
  }
}
