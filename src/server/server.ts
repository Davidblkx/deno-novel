import { oak } from '../_deps.ts';
import { serverEvents } from '../shared/server-events.ts';
import {
  IAppSettings,
  IDenoNovel,
} from '../shared/state.model.ts';
import { registerMiddleware } from './middleware/__.ts';

import type { ServerState, Server } from './models/__.ts';
export async function startServer(dn: IDenoNovel, port?: number): Promise<0 | unknown> {
  const app = new oak.Application<ServerState>({
    logErrors: true,
  });

  // Copy settings to server state
  for (const key of Object.keys(dn.app)) {
    const aKey = key as keyof IAppSettings;
    // deno-lint-ignore no-explicit-any
    (app.state as any)[aKey] = dn.app[aKey];
  }

  app.state.cwd = dn.cwd;
  app.state.port = port ?? dn.app.port;

  registerMiddleware(app);
  registerEvents(app);

  try {
    await app.listen({ port: app.state.port });
    return 0;
  } catch (err) {
    return err;
  }
}

function registerEvents(app: Server): void {
  // deno-lint-ignore no-explicit-any
  app.addEventListener('error', (event: any) => {
    console.warn(`Server error: ${event}`);
    serverEvents.emit('serverError', event);
  });

  app.addEventListener('listen', () => {
    serverEvents.emit('serverStarted', app.state.port);
  });
}
