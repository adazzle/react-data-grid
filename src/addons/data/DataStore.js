class DataStore {

  constructor(rows) {
    this._cache = rows || [];
  }

  getObjectAt(index)  {
    if (index < 0 || index > SIZE) {
      return undefined;
    }
    return _cache[index];
  }

  getSize() {
    return this._cache.length;
  }
}

module.exports = DataStore;
