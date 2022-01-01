import { type Args, parse } from './src/_deps.ts';
import { HelpCommand, commandMap } from './src/cli/_.ts';
import type { CliCommand } from "./src/cli/models.ts";
import { DenoNovel } from './src/app/deno-novel.ts';
import * as Console from './src/cli/utils/console.ts';

const cmdList = [...commandMap.values(), HelpCommand];
const args = parse(Deno.args);

async function runCommand(cmd: CliCommand, args: (string | number)[], options: Args) {
  try {
    const result = await cmd.action(args, options, DenoNovel);
    Deno.exit(result);
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
}

const commandName = args._[0];
const cmd = cmdList.find(e => e.name === commandName);

if (!commandName) {
  await runCommand(HelpCommand, [], args);
} else if (cmd) {
  await runCommand(cmd, args._.slice(1), args);
} else {
  Console.error(`Command ${commandName} not found`);
  await runCommand(HelpCommand, [], args);
}