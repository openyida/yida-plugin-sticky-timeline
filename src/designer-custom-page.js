'use strict';
const React = require('react');
const { StickyTimeline } = require('./timeline');
const { SAMPLE_ENTRIES } = require('./data');

function run() {
  const text = (name, title, initialValue, multiline = false) => ({ name, title, supportVariable: true, initialValue,
    setter: { componentName: 'TextSetter', props: { multiline } } });
  const configure = [
    text('title', '标题', '更新日志'),
    text('description', '说明', '每一次迭代，都是向前的一步。', true),
    text('entries', '时间线数据（JSON 数组 / 变量）', JSON.stringify(SAMPLE_ENTRIES, null, 2), true),
    { name: 'stickyOffset', title: '吸顶偏移（px）', setter: 'NumberSetter', initialValue: 24, supportVariable: true },
    { name: 'showNavigation', title: '显示版本目录', setter: 'BoolSetter', initialValue: true },
    { name: 'theme', title: '主题', initialValue: 'auto', setter: { componentName: 'SelectSetter', props: { options: [
      { label: '跟随系统', value: 'auto' }, { label: '浅色', value: 'light' }, { label: '深色', value: 'dark' },
    ] } } },
    text('emptyText', '空数据提示', '暂无时间线记录'),
    Yida.ComponentPropConfigBuilder.UUID({}, { prefix: 'OpenYidaStickyTimeline' }),
    Yida.ComponentPropConfigBuilder.Style({}, { advanced: true }),
  ];
  Yida.designer.customPage.addComponent({
    componentName: 'OpenYidaStickyTimeline', title: '吸顶时间线', category: '高级',
    icon: () => React.createElement('span', { 'aria-hidden': true }, '◷'), designerView: StickyTimeline,
    snippets: [{ label: '吸顶时间线', description: '日期吸顶、版本导航与更新分类展示', schema: {
      componentName: 'OpenYidaStickyTimeline', props: { title: '更新日志', entries: JSON.stringify(SAMPLE_ENTRIES), stickyOffset: 24, showNavigation: true, theme: 'auto' },
    } }], configure,
  });
}
module.exports = { run };
