import { EventsHandler } from '../lib/core/events/__.ts';

export interface ErrorEvent {
  context?: {
    matched: {
      path: string;
    }[]
  },
  message: string;
}

export interface EventsMap {
  serverStarted: number;
  serverError: ErrorEvent;
}

export const serverEvents = new EventsHandler<EventsMap>();
