import { join } from '../../../_deps.ts';
import { DenoNovel } from '../../../shared/deno-novel.ts';
import { serverEvents } from '../../../shared/server-events.ts';
import { createDebounce } from '../../../utils/debounce.ts';
import * as Console from '../../utils/console.ts';
import { initBundle } from './init-bundle.ts';
import { initStyles } from './init-styles.ts';

export async function initWatcher() {
  const sources = join(DenoNovel.cwd, 'src');
  const styles = join(DenoNovel.cwd, 'styles');

  const watcher = Deno.watchFs([sources, styles], { recursive: true });
  const run = createDebounce(300);

  for await (const e of watcher) {
    run(async () => {
      console.clear();
      const scriptExt = ['.ts', '.tsx', '.js', 'jsx'];
      const styleExt = ['.scss', '.sass'];

      const stylesToUpdate = e.paths.filter(
        (path) => styleExt.some((ext) => path.endsWith(ext)),
      );

      const scriptsToUpdate = e.paths.filter(
        (path) => scriptExt.some((ext) => path.endsWith(ext)),
      );


      if (stylesToUpdate.length) {
        Console.debug('Change detected in styles:');
        for (const s of stylesToUpdate) {
          Console.debug(`  ${s}`);
        }
        Console.info('Updating styles...');
        await initStyles();
        serverEvents.emit('serverRefresh', 'styles');
      }

      if (scriptsToUpdate.length) {
        Console.debug('Change detected in scripts:');
        for (const s of scriptsToUpdate) {
          Console.debug(`  ${s}`);
        }
        Console.info('Updating sources...');
        await initBundle();
        serverEvents.emit('serverRefresh', 'scripts');
      }
    });
  }
}
