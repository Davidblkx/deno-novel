import { runCommand } from '../runner.ts';

import type { Result } from "../../../utils/types.ts";

export async function bundleJs(input: string, out: string, cwd: string): Promise<Result<string>> {
  const args = ['deno', 'bundle', '--unstable', '--config', '.\\deno.jsonc', input, out];
  const { status } = await runCommand(args, cwd);

  if (status.success) {
    return {
      success: true,
      data: 'JS bundled successfully',
    };
  } else {
    return {
      success: false,
      code: status.code,
      error: 'JS bundling failed',
    };
  }
}
