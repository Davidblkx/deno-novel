import type { Args } from '../_deps.ts';
import type { IDenoNovel } from '../app/state.model.ts';

export interface CliCommand {
  name: string;
  description: string;
  args: CliArgument[];
  options: CliOption<unknown>[];
  action: (args: (string | number)[], options: Args, DenoNovel: IDenoNovel) => Promise<number> | number;
}

export interface CliArgument {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface CliOption<T> {
  name: string;
  description: string;
  required: boolean;
  hasValue: boolean;
  shortName?: string;
  defaultValue?: T;
}

export function getOptionValue<T>(opt: Args, option: CliOption<T>, defaultValue: T): T;
export function getOptionValue<T>(opt: Args, option: CliOption<T>): T | undefined;
export function getOptionValue<T>(opt: Args, option: CliOption<T>, defaultValue?: T): T | undefined {
  const value = opt[option.name] ?? opt[option.shortName ?? ''];
  return value ?? option.defaultValue ?? defaultValue;
}