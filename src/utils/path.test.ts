import { assertEquals } from '../_deps.ts';
import { toUnixPath } from './path.ts';

Deno.test('toUnixPath', () => {
  const subject = toUnixPath('C:\\Users\\Deno\\Desktop\\deno-novel\\src\\tools\\path.test.ts');
  const expected = '/Users/Deno/Desktop/deno-novel/src/tools/path.test.ts';
  assertEquals(subject, expected);
});