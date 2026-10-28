'use strict';
const React = require('react');
const { createRoot } = require('react-dom/client');
const { StickyTimeline } = require('../src/timeline');
const { SAMPLE_ENTRIES } = require('../src/data');
const { version } = require('../package.json');
window.React = React;
const params = new URLSearchParams(location.search);
const nested = params.has('nested');
const root = document.getElementById('root');
root.style.cssText = `max-width:${params.get('width') === 'narrow' ? '390px' : '1160px'};margin:32px auto;background:white;${nested ? 'height:600px;overflow:auto;' : ''}`;
const mount = params.has('clipped') ? root.appendChild(document.createElement('div')) : root;
if (mount !== root) mount.style.overflow = 'hidden';
const props = { theme: params.get('theme') || 'light', stickyOffset: 24 };
const children = [React.createElement(StickyTimeline, { key: 1, ...props })];
if (params.has('multiple')) children.push(React.createElement(StickyTimeline, { key: 2, ...props, title: '第二条独立时间线', entries: SAMPLE_ENTRIES.slice(1) }));
const renderer = createRoot(mount);
if (!params.has('federation')) {
  renderer.render(React.createElement(React.Fragment, null, children));
} else {
  // Local contract harness only: the production Yida SDK owns these APIs in a real page.
  const registry = {};
  window.Yida = {
    app: { customPage: { addComponent: component => { registry.app = component; } } },
    designer: { customPage: { addComponent: component => { registry.designer = component; } } },
    ComponentPropConfigBuilder: { UUID: () => ({ name: 'uuid' }), Style: () => ({ name: 'style' }) },
  };
  const script = document.createElement('script');
  script.src = new URL(`./${version}/remoteEntry.js`, location.href).href;
  script.onerror = () => { root.textContent = 'Module Federation 入口加载失败'; };
  script.onload = async () => {
    try {
      const container = window[params.get('federation')];
      await container.init({});
      for (const scenario of ['app', 'designer']) {
        const factory = await container.get(`./${scenario}/custom-page`);
        await factory().run();
      }
      root.dataset.federation = 'registered-app-and-designer';
      renderer.render(React.createElement(registry.app.view, props));
    } catch (error) { root.textContent = error.message; }
  };
  document.head.appendChild(script);
}
