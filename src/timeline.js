'use strict';
const React = require('react');
const { normalizeEntries, offsetValue, SAMPLE_ENTRIES } = require('./data');
const css = require('./styles');
const h = React.createElement;
const TAGS = { new: '新增', update: '优化', fix: '修复', remove: '移除', test: '测试' };

function StickyTimeline(props) {
  const { title = '更新日志', description = '每一次迭代，都是向前的一步。', entries = SAMPLE_ENTRIES,
    stickyOffset = 24, showNavigation = true, theme = 'auto', emptyText = '暂无时间线记录', style, className = '' } = props;
  const normalized = React.useMemo(() => normalizeEntries(entries), [entries]);
  const root = React.useRef(null);
  const articleRefs = React.useRef([]);
  const [active, setActive] = React.useState(0);
  const offset = offsetValue(stickyOffset);

  React.useEffect(() => {
    const element = root.current;
    if (!element) return undefined;
    let frame = 0;
    function update() {
      frame = 0;
      const nodes = articleRefs.current.filter(Boolean);
      if (!nodes.length) return;
      // Find the actual scrolling ancestor, including nested custom-page hosts.
      let ancestor = element.parentElement;
      while (ancestor && !/(auto|scroll|overlay)/.test(getComputedStyle(ancestor).overflowY)) ancestor = ancestor.parentElement;
      const threshold = (ancestor ? Math.max(0, ancestor.getBoundingClientRect().top + ancestor.clientTop) : 0) + offset + 8;
      let next = 0;
      nodes.forEach((node, index) => { if (node.getBoundingClientRect().top <= threshold) next = index; });
      setActive(next);
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    document.addEventListener('scroll', schedule, true);
    window.addEventListener('resize', schedule);
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
    if (observer) observer.observe(element);
    update();
    return () => {
      document.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      if (observer) observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [normalized, offset]);

  const jump = index => {
    const node = articleRefs.current[index];
    if (node) node.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const data = normalized.entries;
  const articles = data.map((entry, index) => {
    const sections = entry.sections.map((section, i) => h('section', { key: i, className: 'tl-section' },
      h('h4', null, h('span', { className: 'tl-tag' }, TAGS[section.tag]), section.title || TAGS[section.tag]),
      h('ul', null, section.items.map((item, j) => h('li', { key: j }, item)))));
    const highlights = entry.highlights.length > 0 && h('div', { className: 'tl-highlights' },
      h('p', { className: 'tl-label' }, '本次重点'),
      h('ol', null, entry.highlights.map((item, i) => h('li', { key: i }, item))));
    return h('article', { key: entry.key, ref: node => { articleRefs.current[index] = node; }, className: 'tl-entry' },
      h('time', { className: 'tl-date', dateTime: entry.date }, entry.date),
      h('div', { className: 'tl-content' },
        h('h3', { className: 'tl-version' }, entry.version || entry.title || entry.date),
        entry.title && entry.version && h('p', { className: 'tl-entry-title' }, entry.title),
        highlights, sections));
  });
  const navigation = showNavigation && h('nav', { className: 'tl-nav', 'aria-label': '时间线目录' },
    h('p', { className: 'tl-nav-label' }, '版本导航'),
    data.map((entry, index) => h('button', { type: 'button', key: entry.key,
      'aria-current': active === index ? 'true' : undefined, onClick: () => jump(index),
    }, entry.version || entry.date || entry.title)));
  return h('section', { ref: root, className: `oy-sticky-timeline ${className}`, 'aria-label': title,
    'data-theme': ['auto', 'light', 'dark'].includes(theme) ? theme : 'auto',
    'data-navigation': String(Boolean(showNavigation)), style: Object.assign({}, style, { '--tl-offset': `${offset}px` }) },
  h('style', null, css),
  h('div', { className: 'tl-shell' },
    h('div', { className: 'tl-eyebrow' }, 'TIMELINE / 更新与进展'),
    h('h2', { className: 'tl-title' }, title),
    description && h('p', { className: 'tl-description' }, description),
    normalized.error ? h('div', { className: 'tl-empty', role: 'alert' }, normalized.error) : data.length === 0 ? h('div', { className: 'tl-empty', role: 'status' }, emptyText) :
    h('div', { className: 'tl-layout' }, h('div', { className: 'tl-entries' }, articles), navigation)));
}

StickyTimeline.displayName = 'OpenYidaStickyTimeline';
module.exports = { StickyTimeline };
