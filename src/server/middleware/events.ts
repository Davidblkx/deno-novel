import type { RouteHandler } from "../models/__.ts";
import { oak } from '../../_deps.ts';
import { serverEvents } from '../../shared/server-events.ts';

const targets: oak.ServerSentEventTarget[] = [];

export const serverEventsRoute: RouteHandler = (_, router) => {
  router.get('/sse', ctx => {
    const target = ctx.sendEvents();
    targets.push(target);
    target.dispatchMessage('ok');
  });

  serverEvents.on('serverRefresh', (type: string) => {
    targets.forEach(t => t.dispatchEvent(new oak.ServerSentEvent(type, '')));
  });
};
