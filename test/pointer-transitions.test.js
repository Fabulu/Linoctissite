import assert from "node:assert/strict";
import test from "node:test";

import { enqueuePointerTransition } from "../public/pointer-transitions.js";

function enqueue(queue, overrides = {}) {
  return enqueuePointerTransition(queue, {
    buttons: 4,
    x: 10,
    y: 20,
    deltaX: 0,
    deltaY: 0,
    mode: 0,
    motion: false,
    ...overrides,
  });
}

test("coalesces a held-motion run without erasing its button edges", () => {
  const queue = [];
  enqueue(queue, { x: 100, y: 120 });
  for (let index = 1; index <= 100; index += 1) {
    enqueue(queue, {
      x: 100 + index,
      y: 120 - index,
      deltaX: 1,
      deltaY: -1,
      motion: true,
    });
  }
  enqueue(queue, { buttons: 0, x: 200, y: 20 });

  assert.deepEqual(queue, [
    { buttons: 4, x: 100, y: 120, deltaX: 0, deltaY: 0, mode: 0, motion: false },
    { buttons: 4, x: 200, y: 20, deltaX: 100, deltaY: -100, mode: 0, motion: true },
    { buttons: 0, x: 200, y: 20, deltaX: 0, deltaY: 0, mode: 0, motion: false },
  ]);
});

test("preserves button and pointer-mode boundaries", () => {
  const queue = [];
  enqueue(queue);
  enqueue(queue, { x: 11, deltaX: 1, motion: true });
  enqueue(queue, { buttons: 12, x: 11 });
  enqueue(queue, { buttons: 12, x: 12, deltaX: 1, motion: true });
  enqueue(queue, { buttons: 12, x: 14, deltaX: 2, motion: true });
  enqueue(queue, { buttons: 12, x: 18, deltaX: 4, mode: 1, motion: true });
  enqueue(queue, { buttons: 4, x: 18, mode: 1 });
  enqueue(queue, { buttons: 4, x: 26, deltaX: 8, mode: 1, motion: true });
  enqueue(queue, { buttons: 0, x: 26, mode: 1 });

  assert.deepEqual(queue.map(({ buttons, x, deltaX, mode, motion }) => (
    { buttons, x, deltaX, mode, motion }
  )), [
    { buttons: 4, x: 10, deltaX: 0, mode: 0, motion: false },
    { buttons: 4, x: 11, deltaX: 1, mode: 0, motion: true },
    { buttons: 12, x: 11, deltaX: 0, mode: 0, motion: false },
    { buttons: 12, x: 14, deltaX: 3, mode: 0, motion: true },
    { buttons: 12, x: 18, deltaX: 4, mode: 1, motion: true },
    { buttons: 4, x: 18, deltaX: 0, mode: 1, motion: false },
    { buttons: 4, x: 26, deltaX: 8, mode: 1, motion: true },
    { buttons: 0, x: 26, deltaX: 0, mode: 1, motion: false },
  ]);
});

test("never mutates a transition that has already become active", () => {
  const queue = [];
  enqueue(queue, { x: 11, deltaX: 1, motion: true });
  const active = queue.shift();
  enqueue(queue, { x: 12, deltaX: 2, motion: true });
  enqueue(queue, { x: 15, deltaX: 3, motion: true });

  assert.deepEqual(active, {
    buttons: 4,
    x: 11,
    y: 20,
    deltaX: 1,
    deltaY: 0,
    mode: 0,
    motion: true,
  });
  assert.deepEqual(queue, [{
    buttons: 4,
    x: 15,
    y: 20,
    deltaX: 5,
    deltaY: 0,
    mode: 0,
    motion: true,
  }]);
});

test("sums coalesced deltas with Lino int32 semantics", () => {
  const queue = [];
  enqueue(queue, { deltaX: 0x7fffffff, deltaY: -0x80000000, motion: true });
  enqueue(queue, { x: 12, y: 22, deltaX: 1, deltaY: -1, motion: true });

  assert.deepEqual(queue, [{
    buttons: 4,
    x: 12,
    y: 22,
    deltaX: -0x80000000,
    deltaY: 0x7fffffff,
    mode: 0,
    motion: true,
  }]);
});
