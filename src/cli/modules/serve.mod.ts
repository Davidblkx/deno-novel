import { startServer } from '../../server/server.ts';
import { serverEvents } from '../../shared/server-events.ts';
import { IDenoNovel } from '../../shared/state.model.ts';
import * as Console from '../utils/console.ts';
import { init } from './serve/__.ts';

let PORT = 0;

export async function runServer(dn: IDenoNovel, port?: number): Promise<number> {
  PORT = port ?? dn.app.port;
  Console.info(`Starting server on port ${PORT}...`);

  initEvents();

  await init();

  const result = await startServer(dn, port);

  if (result === 0) return 0;

  Console.error(`Server error: ${result}`);
  return 1;
}

function initEvents(): void {
  serverEvents.on('serverError', error => {
    if (!error.message) return;

    if (error.context && error.context.matched.length > 0) {
      const path = error.context.matched[0].path;
      if (path === '/sse') return;
      Console.error(`${path}: ${error.message}`);
      return;
    }

    Console.error(`Server error: ${error.message}`);
  });

  serverEvents.on('compileComplete', success => {
    printState(!success);
  });
}

function printState(error?: boolean) {
  if (!error) console.clear();
  Console.info('\nServer running on:')
  Console.success(`  http://localhost:${PORT}`);
  if (error)
    Console.warn('\nErrors found, please fix them before continuing.');
}
