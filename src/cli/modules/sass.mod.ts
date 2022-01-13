import { compileSass } from '../../app/integration/sass/sass.ts';
import * as Console from '../utils/console.ts';

export async function runSassCompile(input: string, output: string, workingDir: string, compress: boolean, sourceMap: boolean): Promise<number> {
  const result = await compileSass({
    compress,
    sourceMap,
    input,
    output,
    workingDir,
  });

  if (result.success) {
    Console.success(result.data);
    return 0;
  } else {
    Console.error(result.error);
    return result.code || 1;
  }
}
