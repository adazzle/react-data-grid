const getMixedTypeValueRetriever = (isImmutable) => {
  let retObj = {};
  const retriever = (item, key) => { return item[key]; };
  const immutableRetriever =  (immutable, key) => { return immutable.get(key); };

  retObj.getValue = isImmutable ? immutableRetriever : retriever;

  return retObj;
};

module.exports = getMixedTypeValueRetriever;
