var isDevEnv = function() {
  return window.location.hostname === 'localhost';
};

var loadScript = function(src) {
  var script = document.createElement('script');
  script.setAttribute('src', src);
  document.getElementsByTagName('body')[0].appendChild(script);
};

var delegateScript = function(fileName) {
  var src = (isDevEnv() ? 'http://localhost:8080/' : 'dist/') + fileName;
  loadScript(src);
};

var loadReact = function() {
  var fileExtension = isDevEnv() ? '.js' : '.min.js';
  var reactSrc = 'https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react' + fileExtension;
  var reactDomSrc = 'https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom' + fileExtension;
  loadScript(reactSrc);
  loadScript(reactDomSrc);
}
