import { CliCommand } from '../models.ts';
import { SassCommand } from './sass.cmd.ts';
import { ServeCommand } from './serve.cmd.ts';
import { VersionCommand } from './version.cmd.ts';

export const commandMap: CliCommand[] = [
  SassCommand,
  VersionCommand,
  ServeCommand,
];
