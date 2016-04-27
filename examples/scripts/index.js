// Import all example JS scripts.
let req = require.context('./', false, /^\.\/example.*\.js$/);

function getFriendlyName(input) {
  let words = input.split('-').map(w => {
    return w[0].toUpperCase() + w.substring(1);
  });
  return words.join(' ') + ' Example';
}

let exampleScripts = req.keys().map(key => {
  let module = req(key);

  // Use the file name to generate hash location and name.
  let firstDashIndex = key.indexOf('-');
  let hashLocation = key.substring(firstDashIndex + 1, key.length - 3);
  let name = getFriendlyName(hashLocation);

  return {
    module: module,
    name: name,
    hashLocation: hashLocation
  };
});

export default exampleScripts;
