export const HashAnchorClicked = "hash-anchor-clicked";
export type HashAnchorClicked = {
  id: string;
  element: HTMLAnchorElement;
};

// inform compiler of the as24 custom events
declare global {
  interface DocumentEventMap {
    [HashAnchorClicked]: CustomEvent<HashAnchorClicked>;
  }
}