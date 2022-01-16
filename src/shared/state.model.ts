export interface DenoNovelVersion {
  readonly denoVersion: string;
  readonly typescriptVersion: string;
  readonly v8Version: string;
  readonly denoNovelVersion: string;
}

export interface IAppSettings {
  title: string;
  port: number;
  docs: string;
  public: string;
  components: { [key: string]: string };
  styles: { [key: string]: string };
  apps: { [key: string]: string };
  prod?: boolean;
  local?: boolean;
}

/** Common state for DenoNovel */
export interface IDenoNovel {
  /** Version of current runtimes */
  readonly version: DenoNovelVersion;

  /** Application settings */
  get app(): IAppSettings;

  /** Current working dir */
  get cwd(): string;
}

export interface InitDenoNovel {
  /** Working directory */
  workingDir: string;
}
