import { startServer } from '../../server/server.ts';
import { serverEvents } from '../../shared/server-events.ts';
import * as Console from '../utils/console.ts';

let PORT = 8080;

export async function runServer(port: number): Promise<number> {
  PORT = port;
  Console.info(`Starting server on port ${port}...`);

  initEvents();

  const result = await startServer(port);

  if (result === 0) return 0;

  Console.error(`Server error: ${result}`);
  return 1;
}

function initEvents(): void {
  serverEvents.on('serverStarted', port => {
    PORT = port;
    printState();
  });
}

function printState(error?: boolean) {
  if (!error) console.clear();
  Console.info('\nServer running on:')
  Console.warn(`  http://localhost:${PORT}`);
}
