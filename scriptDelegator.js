const isDevEnv = () => window.location.hostname === 'localhost';

const delegateScript = fileName => {
  let src = isDevEnv() ? `http://localhost:8080/${fileName}` :  `react-data-grid/dist/${fileName}`;

  let script = document.createElement('script');
  script.setAttribute('src', src);
  document.getElementsByTagName('body')[0].appendChild(script);
};
