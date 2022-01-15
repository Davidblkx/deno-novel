import { bundleJs } from '../../shared/integration/bundler/__.ts';
import { IDenoNovel } from '../../shared/state.model.ts';
import * as Console from '../utils/console.ts';

export async function runBundler(dn: IDenoNovel, input: string, out: string): Promise<number> {
  const result = await bundleJs(input, out, dn.cwd);

  if (result.success) {
    Console.success(result.data);
    return 0;
  } else {
    Console.error(result.error);
    return result.code || 1;
  }
}
