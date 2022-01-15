import { oak } from '../_deps.ts';
import { serverEvents } from '../shared/server-events.ts';
import { registerRoutes } from './routes/__.ts';

export async function startServer(port: number): Promise<0 | unknown> {
  const app = new oak.Application({
    logErrors: false,
  });

  registerRoutes(app);
  registerEvents(app, port);

  try {
    await app.listen({ port });
    return 0;
  } catch (err) {
    return err;
  }
}

function registerEvents(app: oak.Application, port: number): void {
  // deno-lint-ignore no-explicit-any
  app.addEventListener('error', (event: any) => {
    serverEvents.emit('serverError', event);
  });

  app.addEventListener('listen', () => {
    serverEvents.emit('serverStarted', port);
  });
}
