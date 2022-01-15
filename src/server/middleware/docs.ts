import type { RouteHandler } from "../models/__.ts";
import { join } from '../../_deps.ts';

export const docsRoute: RouteHandler = (app, router) => {
  router.get('/docs', async (ctx) => {
    const root = join(ctx.state.cwd, ctx.state.docs);
    ctx.response.body = await readIndexHtml(root, '/docs');
    ctx.response.type = 'text/html';
  });

  app.use(async (ctx, next) => {
    const path = ctx.request.url.pathname;
    if (path.startsWith('/docs/')) {
      const root = join(ctx.state.cwd, ctx.state.docs);
      const fullPath = path.replace('/docs/', '');

      await ctx.send({
        root,
        path: fullPath,
      });

    } else {
      await next();
    }
  });
}

async function readIndexHtml(root: string, prefix: string): Promise<string> {
  const fullPath = join(root, 'index.html');
  let content = await Deno.readTextFile(fullPath);
  content = content.replace("basePath: '/',", `basePath: '${prefix}',`);
  return content;
}
