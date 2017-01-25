const path = require('path');

const isDevEnv = () => window.location.hostname === 'localhost';

const delegateScript = fileName => {
  let src = isDevEnv() ? `http://localhost:8080/${fileName}` : path.join(__dirname, `/dist/${fileName}`);

  let script = document.createElement('script');
  script.setAttribute('src', src);
  document.getElementsByTagName('body')[0].appendChild(script);
};
