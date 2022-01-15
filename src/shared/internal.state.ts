import { join } from '../_deps.ts';
import {
  IAppSettings,
  InitDenoNovel,
} from './state.model.ts';

let hasInit = false;
let workingDir = Deno.cwd();
let app: IAppSettings = {
  title: 'DenoNovel',
  port: 8080,
  docs: '/docs',
  public: '/public',
  components: {},
  styles: {},
  apps: {},
};

async function initAppSettings(cwd: string): Promise<IAppSettings> {
  const fullPath = join(cwd, '.dnovel.json');
  try {
    const txtJson = await Deno.readTextFile(fullPath);
    return {
      ...app,
      ...JSON.parse(txtJson),
    }
  } catch {
    return app;
  }
}

export async function initState(init?: Partial<InitDenoNovel>) {
  if (hasInit) {
    throw new Error('DenoNovel has been initialized');
  }

  workingDir = init?.workingDir ?? workingDir;
  app = await initAppSettings(workingDir);

  hasInit = true;
}

export const state = {
  get workingDir() { return workingDir; },
  get app() { return app; },
}
