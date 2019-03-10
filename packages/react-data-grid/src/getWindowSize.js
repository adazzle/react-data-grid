/**
 * Return window's height and width
 *
 * @return {Object} height and width of the window
 */

export default function getWindowSize() {
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

  return { width, height };
}
