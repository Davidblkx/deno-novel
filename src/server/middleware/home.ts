import type { RouteHandler } from "../models/__.ts";
import { HomeView } from '../views/home.view.ts';

export const homeRoute: RouteHandler = (_, router) => {
  router.get("/", ctx => {
    ctx.response.body = HomeView();
    ctx.response.type = "text/html";
  });
};
