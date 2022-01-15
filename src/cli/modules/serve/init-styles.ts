import { join } from '../../../_deps.ts';
import { DenoNovel } from '../../../shared/deno-novel.ts';
import * as Console from '../../utils/console.ts';
import { runSassCompile } from '../sass.mod.ts';

export async function initStyles(): Promise<void> {
  const map = DenoNovel.app.styles;

  for (const [key, value] of Object.entries(map)) {
    const target = join(DenoNovel.cwd, DenoNovel.app.public, `${key}.css`);
    Console.info(`[SASS] Compiling ${value}...`);
    await runSassCompile(value, target, DenoNovel.cwd, false, true);
  }
}
