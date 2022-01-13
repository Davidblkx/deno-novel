import { runCommand } from '../runner.ts';
import { SassOptions } from './model.ts';

import type { Result } from '../../../utils/types.ts';

/**
 * Compile sass files
 *
 * @param options compile options for sass stylesheet
 * @returns result of compilation
 */
export async function compileSass(options: SassOptions): Promise<Result<string>> {
  const { input, output, compress, sourceMap } = options;

  const args = ['sass', input, output];
  args.push(`--style=${compress ? 'compressed' : 'expanded'}`);
  args.push(`--${sourceMap ? '': 'no-'}source-map`);

  const { status } = await runCommand(args, options.workingDir, options.env);

  if (status.success) {
    return {
      success: true,
      data: 'Sass compiled successfully',
    };
  } else {
    return {
      success: false,
      code: status.code,
      error: 'Sass compilation failed',
    };
  }
}
