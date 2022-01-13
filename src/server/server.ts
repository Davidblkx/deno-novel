import { Application } from '../_deps.ts';

export function startServer(port: number) {
  const app = new Application();

  app.use(async ()) // Find better server framework to use

  app.listen({ port });
}
