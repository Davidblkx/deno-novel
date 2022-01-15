import type { RouteHandler } from "../models/__.ts";

export const compRoute: RouteHandler = (_, router) => {
  router.get('/components', ctx => ctx.response.body = 'Hello from components!');
}
