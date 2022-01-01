export interface DenoNovelVersion {
  readonly denoVersion: string;
  readonly typescriptVersion: string;
  readonly v8Version: string;
  readonly denoNovelVersion: string;
}

/** Common state for DenoNovel */
export interface IDenoNovel {
  /** Version of current runtimes */
  readonly version: DenoNovelVersion;
  /** Current working dir */
  get cwd(): string;
}

export interface InitDenoNovel {
  /** Working directory */
  workingDir: string;
}
