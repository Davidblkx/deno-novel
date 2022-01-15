import { oak } from '../../_deps.ts';
import { Context } from './context.ts';

type KEY = keyof oak.Router

export type RouteHandler = (((ctx: Context) => void) | ((ctx: Context) => Promise<void>));
export type RouteType = Extract<keyof oak.Router, 'get' | 'post' | 'put' | 'patch'>;
export interface Route {
  path: string;
  method: RouteType;
  handler: RouteHandler;
}
