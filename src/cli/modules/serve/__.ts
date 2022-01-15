import { initBundle } from './init-bundle.ts';
import { ensurePublicDir } from './init-public.ts';
import { initStyles } from './init-styles.ts';

export async function init(): Promise<void> {
  await ensurePublicDir();
  await initStyles();
  await initBundle();
}
