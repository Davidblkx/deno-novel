import {
  CliArgument,
  CliCommand,
} from '../models.ts';
import { runBundler } from '../modules/bundle.mod.ts';

const inputArg: CliArgument = {
  name: "input",
  description: "The input file to compile.",
  required: true
};

const outputArg: CliArgument = {
  name: "output",
  description: "The output file to write the compiled file(s) to.",
  required: true
};

export const BundleCommand: CliCommand = {
  name: "bundle",
  description: "Bundle JS/TS files",
  args: [inputArg, outputArg],
  options: [],
  action: (args, _, dn) => {
    const [input, output] = args;

    if (typeof input !== "string") {
      throw new Error("input is required");
    }

    if (typeof output !== "string") {
      throw new Error("output is required");
    }

    return runBundler(dn, input, output);
  }
}
