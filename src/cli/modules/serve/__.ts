import { serverEvents } from '../../../shared/server-events.ts';
import { initBundle } from './init-bundle.ts';
import { ensurePublicDir } from './init-public.ts';
import { initStyles } from './init-styles.ts';
import { initWatcher } from './init-watcher.ts';

export async function init(): Promise<void> {
  serverEvents.emit('startCompile');
  await ensurePublicDir();
  const successStyles = await initStyles();
  const successBundle = await initBundle();
  initWatcher();
  serverEvents.emit('compileComplete', successBundle && successStyles);
}
