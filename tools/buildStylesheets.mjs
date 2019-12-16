import { promises as fs } from 'fs';
import { dirname } from 'path';
import less from 'less';
import CleanCSS from 'clean-css';

const cleanCSS = new CleanCSS({
  level: { 1: { specialComments: false }, 2: {} },
  rebase: false,
  returnPromise: true
});

buildStylesheet();

async function buildStylesheet() {
  const path = './style/react-data-grid.less';
  const buf = await fs.readFile(path);
  try {
    const { css } = await less.render(buf.toString(), { filename: path });
    const { styles } = await cleanCSS.minify(css);
    const dest = path.replace('/style/', '/dist/').replace('.less', '.css');
    await fs.mkdir(dirname(dest), { recursive: true });
    await fs.writeFile(dest, styles);
  } catch (err) {
    console.error(err.message || err);
    process.exitCode = 1;
  }
}
