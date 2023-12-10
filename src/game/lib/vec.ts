export type Vec2 = [number, number]
export type Polygon = Vec2[]

export const diff = (a: Vec2, b: Vec2): Vec2 => [a[0] - b[0], a[1] - b[1]]
export const cross = (a: Vec2, b: Vec2): number => a[0] * b[1] - a[1] * b[0]

export const intersected = (
  sa: Vec2,
  ea: Vec2,
  sb: Vec2,
  eb: Vec2,
  tolerance: number,
): boolean => {
  const a = diff(ea, sa)
  const b = diff(eb, sb)
  const c1 = cross(a, diff(sb, sa))
  const c2 = cross(a, diff(eb, sa))
  const c3 = cross(b, diff(sa, sb))
  const c4 = cross(b, diff(ea, sb))
  return c1 < tolerance && c2 > -tolerance && c3 > -tolerance && c4 < tolerance
}

export const norm = (a: Vec2): number => Math.sqrt(a[0] * a[0] + a[1] * a[1])
