import { oak } from '../../_deps.ts';
import { compRoute } from './components.ts';

export function registerRoutes(app: oak.Application): void {
  const router = new oak.Router();

  const routes = [
    compRoute,
  ];

  for (const r of routes) {
    const method = router[r.method];
    if (typeof method !== 'function') return;
    method.call(router, r.path, r.handler);
  }

  app.use(router.routes());
  app.use(router.allowedMethods());
}
