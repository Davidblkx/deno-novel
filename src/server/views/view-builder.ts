import { join } from '../../_deps.ts';
import { DenoNovel } from '../../shared/deno-novel.ts';
import { toUnixPath } from '../../utils/path.ts';

export interface ViewBuilderOptions {
  styles?: string[];
  scripts?: string[];
  title?: string;
}

export function buildView(body: string, options: ViewBuilderOptions = {}): string {
  const { styles = [], scripts = [], title = '' } = options;
  const toPublic = (p: string) => toUnixPath(join('public', p));
  scripts.push('server-reload.js');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <link rel="icon" href="data:,">
  <title>${title || DenoNovel.app.title}</title>
  ${styles.map(style => `<link rel="stylesheet" href="/${toPublic(style)}">`).join('\n')}
</head>
<body>
  ${body}
  ${scripts.map(script => `<script src="/${toPublic(script)}"></script>`).join('\n')}
</body>
</html>`;
}
