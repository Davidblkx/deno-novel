export interface ViewBuilderOptions {
  styles?: string[];
  scripts?: string[];
  title?: string;
}

export function buildView(body: string, options: ViewBuilderOptions = {}): string {
  const { styles = [], scripts = [], title = '' } = options;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${title}</title>
  ${styles.map(style => `<link rel="stylesheet" href="/public/${style}">`).join('\n')}
</head>
<body>
  ${body}
  ${scripts.map(script => `<script src="/public/${script}"></script>`).join('\n')}
</body>
</html>`;
}
