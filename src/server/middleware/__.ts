import { oak } from '../../_deps.ts';
import { ServerState } from '../models/__.ts';
import { compRoute } from './components.ts';
import { docsRoute } from './docs.ts';
import { publicRoute } from './public.ts';

export function registerMiddleware(app: oak.Application<ServerState>): void {
  const router = new oak.Router<oak.RouteParams, ServerState>();

  const toHandle = [
    compRoute,
    docsRoute,
    publicRoute,
  ];

  for (const handler of toHandle) {
    handler(app, router);
  }

  app.use(router.routes());
  app.use(router.allowedMethods());
}
