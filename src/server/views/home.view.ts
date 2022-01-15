import { buildView } from './view-builder.ts';

export const HomeView = () => buildView(/*html*/`
<h1>Hello from home!</h1>
`, {
  styles: ['main.css'],
  scripts: ['server-front.js'],
});
