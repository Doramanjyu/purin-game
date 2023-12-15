import { Frame, Root } from './coords'

test('created Frames have proper levels', () => {
  const f1 = new Frame('f1', Root)
  expect(f1.level()).toBe(1)
  const f2 = new Frame('f2', f1)
  expect(f2.level()).toBe(2)
})

test('relative position between two frames is calculated', () => {
  const origin = new Frame('origin', Root, [100, 200])
  const frame1 = new Frame('f1', origin, [2, 3])
  const frame2 = new Frame('f2', origin, [5, 7])
  const frame3 = new Frame('f3', frame2, [11, 13])

  expect(frame2.from(frame2)).toStrictEqual([0, 0])
  expect(frame1.from(origin)).toStrictEqual([2, 3])
  expect(frame3.from(frame1)).toStrictEqual([14, 17])
  expect(frame1.from(frame3)).toStrictEqual([-14, -17])
})
