import { promises as fs } from 'fs';
import { dirname } from 'path';
import less from 'less';
import CleanCSS from 'clean-css';

const path = './style/index.less';
const dest = './dist/react-data-grid.css';

const cleanCSS = new CleanCSS({
  level: { 1: { specialComments: false }, 2: {} },
  rebase: false,
  returnPromise: true
});

buildStylesheet();

async function buildStylesheet() {
  const buf = await fs.readFile(path, 'utf8');
  try {
    const { css } = await less.render(buf, { filename: path });
    const { styles } = await cleanCSS.minify(css);
    await fs.mkdir(dirname(dest), { recursive: true });
    await fs.writeFile(dest, styles);
  } catch (err) {
    console.error(err.message || err);
    process.exitCode = 1;
  }
}
