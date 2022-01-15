import {
  emptyDir,
  ensureDir,
  join,
} from '../../../_deps.ts';
import { DenoNovel } from '../../../shared/deno-novel.ts';

export async function ensurePublicDir(): Promise<void> {
  const fullPath = join(DenoNovel.cwd, DenoNovel.app.public);
  await ensureDir(fullPath);
  await emptyDir(fullPath);
}
