let startTime = 0

export function updateStartTime(): void {
  startTime = performance.now()
}

export function getElapsedTime(): number {
  return Math.round(performance.now() - startTime)
}
