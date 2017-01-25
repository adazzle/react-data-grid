const ghpages = require('gh-pages');
const path = require('path');

const publishToGhPages = () => {
  ghpages.publish(
    path.join(__dirname, '../../packages/react-data-grid-examples'),
    (err) => {
      if (err) throw new Error(err);
    }
  );
};

publishToGhPages();
