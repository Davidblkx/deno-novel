### Logger

Deno novel uses a custom logger to log messages. It allows to log messages in different levels, to filter them by level and to choose the output.

## Basics

```ts
import { DnLogger } from 'https://deno.land/x/deno-novel/mod.ts';

DnLogger.setLevel(LogLevel.Error);
DnLogger.info('Hello world'); // nothing happens
DnLogger.error('Oops', new Error('Message')); // Oops Error: Message
```

## Conditional logging

```ts
import { DnLogger } from 'https://deno.land/x/deno-novel/mod.ts';

DnLogger.Error('Something happen:', { $assert: err instanceof Error }, err); // Error is only printed if err is an Error
```

## Custom output

By default, the logger outputs to the console. You can change the output format and location by using the `addEngine` or `removeEngine` method.

```ts
import { DnLogger, InternalLoggerEngine } from 'https://deno.land/x/deno-novel/mod.ts';

class FileLogger implements LoggerEngine {
  write(level: LogLevel, message: string, data: any) {
    //Logic to write to a file
  }
  default: (m, ...p) => this.write(LogLevel.Default, m, p);
  engine: (m, ...p) => this.write(LogLevel.Engine, m, p);
  info: (m, ...p) => this.write(LogLevel.Info, m, p);
  debug: (m, ...p) => this.write(LogLevel.Debug, m, p);
  warning: (m, ...p) => this.write(LogLevel.Warning, m, p);
  error: (m, ...p) => this.write(LogLevel.Error, m, p);
}

DnLogger.addEngine(new FileLogger());
DnLogger.info('Hello world'); // Hello world is printed to console and to file
DnLogger.removeEngine(InternalLoggerEngine);
DnLogger.info('Hello world'); // Hello world is printed to file only

```
!> If no engine is present, the logger won't log anything.
