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
  defaultValue: 8080,
  shortName: 'p'
}

export const ServeCommand: CliCommand = {
  name: 'serve',
  description: 'Start the developement server',
  args: [],
  options: [portOption],
  action: (_, options) => {
    const port = getOptionValue(options, portOption, 8080);
    return runServer(port);
  }
}
