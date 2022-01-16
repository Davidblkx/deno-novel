import type { RefreshType } from '../../shared/server-events.ts';

function startEventSource(reload = false) {
  let source: EventSource | undefined = new EventSource('/sse');

  const scriptRefresh: RefreshType = 'scripts';
  const styleRefresh: RefreshType = 'styles';

  source.addEventListener(scriptRefresh, () => {
    source?.close();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  });

  source.addEventListener(styleRefresh, () => {
    const links = document.getElementsByTagName('link');
    for (const l of links) {
      if (l.rel == 'stylesheet') {
        l.href = l.href + '?v=' + new Date().getTime();
      }
    }
  });

  source.onerror = () => {
    console.warn('EventSource error, trying to reconnect...');
    source?.close();
    source = undefined;
    setTimeout(() => {
      startEventSource(true);
    }, 5000);
  };

  source.onopen = () => {
    if (reload) {
      source?.close();
      window.location.reload();
    }
  };
}

setTimeout(() => {
  startEventSource(false);
}, 500);
