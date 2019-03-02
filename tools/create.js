import { writeFile } from './lib/fs';

async function create() {
  await writeFile(
    'build/.npmrc',
    '# Force npm to run node-gyp also as root, preventing permission denied errors in AWS with npm@5 \n unsafe-perm=true',
  );
}

export default create;
