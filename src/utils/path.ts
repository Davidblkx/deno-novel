import { join } from '../_deps.ts';
import { DenoNovel } from '../app/deno-novel.ts';

/** Get full path from relative path */
export function getFullPath(path: string): string {
  return toUnixPath(join(DenoNovel.cwd, path));
}

/** Converts windows path to unix */
export function toUnixPath(path: string): string {
  path = path
    .replace(/\\/g, '/')
    .replace(/\/\//i, '/');

  if (path[1] === ':') {
    path = path.substring(2);
  }

  return path;
}