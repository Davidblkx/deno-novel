import { RunOptions } from '../../../utils/types.ts';

export interface SassOptions extends RunOptions {
  input: string;
  output: string;
  compress: boolean;
  sourceMap: boolean;
}

export interface SassResult {
  success: boolean;
  message: string;
}
