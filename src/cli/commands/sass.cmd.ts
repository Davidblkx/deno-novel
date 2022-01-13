import {
  CliArgument,
  CliCommand,
  CliOption,
  getOptionValue,
} from '../models.ts';
import { runSassCompile } from '../modules/sass.mod.ts';

const inputArg: CliArgument = {
  name: 'input',
  description: 'The input file or directory to compile.',
  required: true
}

const outputArg: CliArgument = {
  name: 'output',
  description: 'The output file to write the compiled file(s) to.',
  required: true
}

const compressOpt: CliOption<boolean> = {
  name: 'compress',
  description: 'Compress the output using the compressed option.',
  required: false,
  hasValue: false,
  defaultValue: false
}

const sourceMapOpt: CliOption<boolean> = {
  name: 'source-map',
  description: 'Generate source map files.',
  required: false,
  hasValue: false,
  defaultValue: false
}

export const SassCommand: CliCommand = {
  name: 'sass',
  description: 'Compile sass files',
  args: [inputArg, outputArg],
  options: [compressOpt, sourceMapOpt],
  action: async (args, options, dn) => {
    const [input, output] = args;

    if (typeof input !== 'string') {
      throw new Error('input is required');
    }

    if (typeof output !== 'string') {
      throw new Error('output is required');
    }

    const compress = getOptionValue(options, compressOpt, false);
    const sourceMap = getOptionValue(options, sourceMapOpt, false);

    return await runSassCompile(input, output, dn.cwd, compress, sourceMap);
  }
};
