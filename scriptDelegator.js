var isDevEnv = function() {
  return window.location.hostname === 'localhost';
};

var delegateScript = function(fileName) {
  var src = (isDevEnv() ? 'http://localhost:8080/' : 'dist/') + fileName;

  var script = document.createElement('script');
  script.setAttribute('src', src);
  document.getElementsByTagName('body')[0].appendChild(script);
};
