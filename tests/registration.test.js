'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const { StickyTimeline } = require('../src/timeline');

test('设计器和运行时只注册自定义页面组件，配置与插入片段可用', () => {
  const registry = {};
  global.Yida = {
    app: { customPage: { addComponent: value => { registry.app = value; } } },
    designer: { customPage: { addComponent: value => { registry.designer = value; } } },
    ComponentPropConfigBuilder: { UUID: () => ({ name: 'uuid' }), Style: () => ({ name: 'style' }) },
  };
  try {
    require('../src/app-custom-page').run();
    require('../src/designer-custom-page').run();
    assert.equal(registry.app.componentName, 'OpenYidaStickyTimeline');
    assert.equal(registry.app.view, registry.designer.designerView);
    assert.equal(registry.app.view.displayName, 'OpenYidaStickyTimeline');
    assert.equal(registry.app.mobileView, registry.app.view);
    const props = registry.designer.snippets[0].schema.props;
    assert.ok(registry.designer.configure.some(item => item.name === 'entries' && item.supportVariable));
    const html = renderToStaticMarkup(React.createElement(registry.app.view, props));
    assert.match(html, /2026-10-28/);
    assert.match(html, /时间线目录/);
  } finally { delete global.Yida; }
});

test('条目按纯文本渲染，空数组与错误数据不回落为样例', () => {
  const html = renderToStaticMarkup(React.createElement(StickyTimeline, { entries: [{ title: '<img src=x onerror=alert(1)>', sections: [] }] }));
  assert.ok(!html.includes('<img'));
  assert.match(html, /&lt;img/);
  assert.match(renderToStaticMarkup(React.createElement(StickyTimeline, { entries: [] })), /暂无时间线记录/);
  assert.match(renderToStaticMarkup(React.createElement(StickyTimeline, { entries: '[bad' })), /role="alert"/);
});
