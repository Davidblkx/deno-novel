export interface RunResult {
  output: string;
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
    stdin: 'piped',
    stdout: 'piped',
    stderr: 'piped',
  });

  const status = await denoRun.status();
  const rawOutpur = await denoRun.output();
  const rawError = await denoRun.stderrOutput();

  return {
    output: new TextDecoder()
      .decode(status.code === 0 ? rawOutpur : rawError),
    status,
  }
}
