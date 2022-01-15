import type { RouteHandler } from "../models/__.ts";
import { join } from '../../_deps.ts';

export const publicRoute: RouteHandler = app => {
  app.use(async (ctx, next) => {
    const path = ctx.request.url.pathname;
    if (path.startsWith('/public/')) {
      const root = join(ctx.state.cwd, ctx.state.public);
      const fullPath = path.replace('/public/', '');

      await ctx.send({
        root,
        path: fullPath,
      });

    } else {
      await next();
    }
  });
};
