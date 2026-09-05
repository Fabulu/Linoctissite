export function enqueuePointerTransition(queue, transition) {
  const next = {
    buttons: transition.buttons | 0,
    x: transition.x | 0,
    y: transition.y | 0,
    deltaX: transition.deltaX | 0,
    deltaY: transition.deltaY | 0,
    mode: transition.mode | 0,
    motion: transition.motion === true,
  };
  const previous = queue.at(-1);
  if (next.motion && previous?.motion
      && previous.buttons === next.buttons && previous.mode === next.mode) {
    previous.x = next.x;
    previous.y = next.y;
    previous.deltaX = (previous.deltaX + next.deltaX) | 0;
    previous.deltaY = (previous.deltaY + next.deltaY) | 0;
    return previous;
  }
  queue.push(next);
  return next;
}
