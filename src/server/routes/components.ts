import type { Route } from "../models/__.ts";

export const compRoute: Route = {
  path: '/components',
  method: 'get',
  handler: ctx => ctx.response.body = 'Hello from components!',
}
