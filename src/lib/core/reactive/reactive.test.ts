import { assertEquals } from '../../../_deps.ts';
import { Observable } from './__.ts';

Deno.test('Observable should emit value', async () => {
  const expected = 'Hello world!';

  const subject = new Observable<string>();
  const result = new Promise(res => {
    subject.subscribe(res);
  });
  subject.next(expected);

  assertEquals(await result, expected);
});

Deno.test('Observable should emit error', async () => {
  const expected = new Error('Hello world!');

  const subject = new Observable<string>();
  const result = new Promise(res => {
    subject.subscribe(undefined, res);
  });
  subject.error(expected);

  assertEquals(await result, expected);
});

Deno.test('Observable should not emit after completed', async () => {
  const subject = new Observable<string>();

  const result = new Promise<boolean>(res => {
    subject.subscribe(undefined, undefined, () => res(true));
  });
  subject.complete();

  assertEquals(await result, true);

  let called = false;
  await new Promise<void>(res => {
    subject.subscribe(_ => {
      called = true;
      res();
    });

    setTimeout(() => res(), 300);
  });

  assertEquals(called, false);
});
