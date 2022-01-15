import { IDenoNovel } from "./state.model.ts";
import { state } from './internal.state.ts';

export const DenoNovel: IDenoNovel = {
  
  version: {
    denoVersion: Deno.version.deno,
    typescriptVersion: Deno.version.deno,
    v8Version: Deno.version.v8,
    denoNovelVersion: '0.0.1',
  },

  get cwd() { return state.workingDir; },

}
