export function htmlParser<T extends HTMLElement>(html: string): T {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html.trim(), 'text/html');
  return doc.body.firstChild as T;
}
