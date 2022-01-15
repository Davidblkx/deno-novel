import { oak } from '../../_deps.ts';
import { IAppSettings } from '../../shared/state.model.ts';

export interface ServerState extends IAppSettings {
  cwd: string;
}

export class Server extends oak.Application<ServerState> { }
export class RouteServer extends oak.Router<oak.RouteParams, ServerState> {}

export type RouteHandler = (app: Server, router: RouteServer) => void;
