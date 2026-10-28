'use strict';

const SAMPLE_ENTRIES = [
  { id: 'v130', version: '1.3.0', date: '2026-10-28', title: '让每一次进步，都清晰可见', highlights: ['以时间为线索，记录产品更新与团队里程碑。', '滚动阅读时，日期始终陪伴当前内容。'], sections: [
    { tag: 'new', title: '新增功能', items: ['日期随条目吸顶，下一条更新进入时自然接替。', '侧边目录支持快速定位到指定版本。', '时间线支持业务数据绑定，可用于项目进展与版本记录。'] },
    { tag: 'update', title: '体验优化', items: ['根据组件实际宽度调整布局，适配嵌入页面。', '提供浅色、深色与跟随系统主题。'] },
  ] },
  { id: 'v120', version: '1.2.0', date: '2026-10-21', title: '把重要变化，留在时间线上', highlights: ['聚焦重点，让团队更快找到与自己有关的更新。'], sections: [
    { tag: 'new', title: '新增功能', items: ['通过重点摘要传达本次更新的核心价值。', '按功能类别组织内容，便于快速浏览。'] },
    { tag: 'fix', title: '问题修复', items: ['长文本自动换行。', '空数据展示明确提示，帮助用户了解当前状态。'] },
  ] },
  { id: 'v110', version: '1.1.0', date: '2026-10-14', title: '从一个清晰的起点开始', highlights: ['用简洁的记录，连接每一个值得记住的时刻。'], sections: [
    { tag: 'new', title: '新增功能', items: ['版本、日期、标题与分类说明统一呈现。', '支持鼠标与键盘浏览版本目录。'] },
    { tag: 'update', title: '持续优化', items: ['尊重系统减少动态效果的偏好。', '多个时间线可在同一页面独立展示。'] },
  ] },
];

function normalizeEntries(input) {
  let list = input;
  if (typeof list === 'string') {
    try { list = JSON.parse(list); } catch (_) { return { entries: [], error: '时间线数据不是有效的 JSON 数组' }; }
  }
  if (!Array.isArray(list)) return { entries: [], error: '请传入时间线数组' };
  if (list.some(e => !e || typeof e !== 'object' || Array.isArray(e))) return { entries: [], error: '每个时间线条目必须是对象' };
  const strings = value => Array.isArray(value) ? value.filter(v => typeof v === 'string') : [];
  return { entries: list.map((e, index) => ({
    key: String(index),
    version: typeof e.version === 'string' ? e.version : '',
    date: typeof e.date === 'string' ? e.date : '',
    title: typeof e.title === 'string' ? e.title : '',
    highlights: strings(e.highlights),
    sections: (Array.isArray(e.sections) ? e.sections : []).filter(s => s && typeof s === 'object').map(s => ({
      tag: ['new', 'update', 'fix', 'remove', 'test'].includes(s.tag) ? s.tag : 'update',
      title: typeof s.title === 'string' ? s.title : '', items: strings(s.items),
    })),
  })), error: null };
}

function offsetValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(600, Math.max(0, number)) : 24;
}

module.exports = { SAMPLE_ENTRIES, normalizeEntries, offsetValue };
