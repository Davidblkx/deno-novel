export interface RunResult {
  output: Uint8Array;
  status: Deno.ProcessStatus;
}

/**
 * Run a command in a shell
 *
 * @param args command line arguments
 * @param workingDir working directory
 * @param env environment variables
 * @returns output and status of the command
 */
export async function runCommand(args: string[], workingDir: string, env?: { [key: string]: string }): Promise<RunResult> {
  if (Deno.build.os === 'windows') {
    args = ['pwsh', '-c', ...args];
  } else {
    args = ['bash', '-c', args.join(' ')];
  }

  const denoRun = Deno.run({
    cmd: args,
    cwd: workingDir,
    env: env,
  });

  return {
    output: await denoRun.output(),
    status: await denoRun.status(),
  }
}