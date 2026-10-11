export const scrollState = {
  progress: 0,
  section: "hero" as string,
  sectionProgress: 0,
  pointer: { x: 0, y: 0 },
}

export function setScrollProgress(p: number) {
  scrollState.progress = Math.max(0, Math.min(1, p))
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
