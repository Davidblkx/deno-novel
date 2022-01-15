import { join } from '../../../_deps.ts';
import { DenoNovel } from '../../../shared/deno-novel.ts';
import * as Console from '../../utils/console.ts';
import { runBundler } from '../bundle.mod.ts';

export async function initBundle(): Promise<void> {
  await bundleMap(DenoNovel.app.apps);
}

async function bundleMap(map: { [key: string]: string }): Promise<void> {
  for (const [key, value] of Object.entries(map)) {
    const target = join(DenoNovel.cwd, DenoNovel.app.public, `${key}.js`);
    Console.info(`[TS/JS] Compiling ${value}...`);
    await runBundler(DenoNovel, value, target);
  }
}
