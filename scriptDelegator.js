var isDevEnv = () => window.location.hostname === 'localhost';

var delegateScript = fileName => {
  var src = isDevEnv() ? `http://localhost:8080/${fileName}` :  `dist/${fileName}`;

  var script = document.createElement('script');
  script.setAttribute('src', src);
  document.getElementsByTagName('body')[0].appendChild(script);
};
