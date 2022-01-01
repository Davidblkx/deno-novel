import { VersionCommand } from "./version.cmd.ts";
import { CliCommand } from '../models.ts';

export const commandMap: CliCommand[] = [
  VersionCommand,
];