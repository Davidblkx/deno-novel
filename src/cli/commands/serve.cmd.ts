import {
  CliCommand,
  CliOption,
  getOptionValue,
} from '../models.ts';
import { runServer } from '../modules/serve.mod.ts';

const portOption: CliOption<number> = {
  name: 'port',
  description: 'The port to run the server on.',
  required: false,
  hasValue: true,
  shortName: 'p'
}

export const ServeCommand: CliCommand = {
  name: 'serve',
  description: 'Start the developement server',
  args: [],
  options: [portOption],
  action: (_, options, dn) => {
    const port = getOptionValue(options, portOption);
    return runServer(dn, port);
  }
}
