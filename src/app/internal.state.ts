import { InitDenoNovel } from './state.model.ts';

let hasInit = false;
let workingDir = Deno.cwd();

export function initState(init: InitDenoNovel) {
  if (hasInit) {
    throw new Error('DenoNovel has been initialized');
  }
  workingDir = init.workingDir;
  hasInit = true;
}

export const state = {
  get workingDir() { return workingDir; },
}