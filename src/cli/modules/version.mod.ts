import type { IDenoNovel } from "../../app/state.model.ts";
import * as Console from '../utils/console.ts';

export function printVersion({ version }: IDenoNovel): number {
    Console.info(`v8: ${version.v8Version}`);
    Console.info(`deno: ${version.denoVersion}`);
    Console.info(`deno-novel: ${version.denoNovelVersion}`);
    Console.info(`typescript: ${version.typescriptVersion}`);
    return 0;
}