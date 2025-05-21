export function documentOn<K extends keyof DocumentEventMap>(
  sig: AbortSignal,
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => unknown,
  options?: AddEventListenerOptions
) {
  document.addEventListener<K>(type, listener, { ...options, signal: sig });
}
