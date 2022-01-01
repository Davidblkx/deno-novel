import { assertEquals } from '../../../_deps.ts';
import { DnEvents } from './events-handler.ts';

Deno.test('Event handler shoud emit', async () => {

  const expected = 'Hello world!';

  const result = await new Promise(res => {
    const handler = DnEvents.for<{ test: string }>();

    handler.on('test', (data) => {
      res(data);
    });

    handler.emit('test', expected);
  });

  assertEquals(result, expected);

});
