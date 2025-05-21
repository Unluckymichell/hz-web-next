export function checkVisible(
  elm: HTMLElement,
  threshold: number = 0,
  mode: "visible" | "above" | "below" = "visible"
): boolean {
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  const above = rect.bottom - threshold < 0;
  const below = rect.top - viewHeight + threshold >= 0;

  return mode === "above" ? above : mode === "below" ? below : !above && !below;
}
