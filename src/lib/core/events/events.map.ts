export interface ExceptionEvents {
  /** Unhandled exception */
  exception: Error;
}

export interface ElementsEvents {
  /** Element registry started initialization */
  initStart: never;
  /** A new web component was registered */
  elementRegistered: string;
  /** Element registry finished initialization */
  initEnd: never;
}

/** Events map for DenoNovel library */
export type DnEventsMap = ExceptionEvents & ElementsEvents;
