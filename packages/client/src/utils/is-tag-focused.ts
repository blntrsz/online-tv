export function isTagFocused(
  elementName: "main" | "header",
  element?: Element | HTMLElement | null
): boolean {
  if (
    element
      ? element?.parentElement?.tagName === elementName.toUpperCase()
      : document.activeElement?.parentElement?.tagName ===
        elementName.toUpperCase()
  ) {
    return true;
  }

  if (element && !element?.parentElement) {
    return false;
  }

  return isTagFocused(
    elementName,
    element?.parentElement ?? document.activeElement?.parentElement
  );
}
