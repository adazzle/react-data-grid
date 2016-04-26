// Import all example JS scripts.
let req = require.context('./', false, /^\.\/example.*\.js$/);
let exampleScripts = {};
req.keys().forEach(key => {
  let module = req(key);
  exampleScripts[key] = module;
});

export default exampleScripts;
