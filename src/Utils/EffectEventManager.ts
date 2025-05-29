export function EffectEventManager<
  em extends GlobalEventHandlersEventMap = DocumentEventMap
>(
  element: {
    addEventListener: <T extends keyof em>(
      type: T,
      listener: (this: Document, ev: em[T]) => unknown,
      options?: AddEventListenerOptions
    ) => void;
  } = document,
  ac: AbortController = new AbortController()
) {
  const manager = () => ac.abort();
  manager.handle = <T extends keyof em>(
    type: T,
    listener: (this: Document, ev: em[T]) => unknown,
    options?: AddEventListenerOptions
  ) => {
    element.addEventListener(type, listener, { ...options, signal: ac.signal });
    return manager;
  };
  manager.other = function other<em extends GlobalEventHandlersEventMap = DocumentEventMap>(oelement: {
    addEventListener: <T extends keyof em>(
      type: T,
      listener: (this: Document, ev: em[T]) => unknown,
      options?: AddEventListenerOptions
    ) => void;
  }) {
    const otherManager = EffectEventManager(oelement, ac);
    return otherManager;
  }
  return manager;
}
