'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { normalizeEntries, offsetValue, stickyShift } = require('../src/data');
test('数组和设计器 JSON 绑定结果相同，重复 ID 不覆盖条目', () => {
  const data = [{ id: 'a', version: '1', sections: [{ tag: 'invalid', items: ['safe', null] }] }, { id: 'a', version: '2' }];
  assert.deepEqual(normalizeEntries(JSON.stringify(data)), normalizeEntries(data));
  assert.equal(normalizeEntries(data).entries.length, 2);
  assert.deepEqual(normalizeEntries(data).entries[0].sections[0], { tag: 'update', title: '', items: ['safe'] });
});
test('空数组保持空态，非法数据显式报错，不偷偷展示样例', () => {
  assert.deepEqual(normalizeEntries([]), { entries: [], error: null });
  for (const input of ['{bad', '{}', null, [null]]) assert.ok(normalizeEntries(input).error);
});
test('吸顶偏移拒绝 NaN 和无限值，并限定合理范围', () => {
  assert.equal(offsetValue('oops'), 24);
  assert.equal(offsetValue(Infinity), 24);
  assert.equal(offsetValue(-10), 0);
  assert.equal(offsetValue(10000), 600);
  assert.equal(offsetValue('72'), 72);
});

test('宿主裁剪兼容只在当前条目范围内移动日期', () => {
  assert.equal(stickyShift(200, 500, 32, 56, 76), 0);
  assert.equal(stickyShift(-160, 500, 32, 56, 76), 236);
  assert.equal(stickyShift(-600, 500, 32, 56, 76), 412);
  assert.equal(stickyShift(-20, 20, 32, 56, 76), 0);
});
