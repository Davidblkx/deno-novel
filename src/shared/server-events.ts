import { EventsHandler } from '../lib/core/events/__.ts';

export interface ErrorEvent {
  context?: {
    matched: {
      path: string;
    }[]
  },
  message: string;
}

export type RefreshType = 'styles' | 'scripts' | 'all';

export interface EventsMap {
  serverStarted: number;
  serverError: ErrorEvent;
  serverRefresh: RefreshType;
}

export const serverEvents = new EventsHandler<EventsMap>();
