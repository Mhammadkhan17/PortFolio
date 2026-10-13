export const scrollState = {
  progress: 0,
  velocity: 0,
  section: "hero" as string,
  sectionProgress: 0,
  pointer: { x: 0, y: 0 },
}

let prevScroll = 0

export function setScrollProgress(p: number) {
  const clamped = Math.max(0, Math.min(1, p))
  scrollState.velocity = clamped - prevScroll
  prevScroll = clamped
  scrollState.progress = clamped
}

export function setActiveSection(id: string) {
  scrollState.section = id
}

export function setSectionProgress(p: number) {
  scrollState.sectionProgress = Math.max(0, Math.min(1, p))
}

export function setPointer(x: number, y: number) {
  scrollState.pointer.x = x
  scrollState.pointer.y = y
}
