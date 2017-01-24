/**
 * Return window's height and width
 *
 * @return {Object} height and width of the window
 */

function getWindowSize(): {width: number; height: number} {
  let width = window.innerWidth;
  let height = window.innerHeight;

  if (!width || !height) {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  }

  if (!width || !height) {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }

  return {width, height};
}

module.exports = getWindowSize;
