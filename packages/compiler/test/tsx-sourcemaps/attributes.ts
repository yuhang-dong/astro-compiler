import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { testSourcemap } from '../utils';

test('shorthand attribute', async () => {
  const input = `<div {name} />`;

  const output = await testSourcemap(input, 'name');
  assert.equal(output, {
    source: 'index.astro',
    line: 1,
    column: 6,
    name: null,
  });
});

test('empty quoted attribute', async () => {
  const input = `<div src="" />`;

  const open = await testSourcemap(input, '"');
  assert.equal(open, {
    source: 'index.astro',
    line: 1,
    column: 9,
    name: null,
  });
});

test('template literal attribute', async () => {
  const input = `---
---
<Tag src=\`bar\${foo}\` />`;

  const open = await testSourcemap(input, 'foo');
  assert.equal(open, {
    source: 'index.astro',
    line: 3,
    column: 16,
    name: null,
  });
});

test.run();
