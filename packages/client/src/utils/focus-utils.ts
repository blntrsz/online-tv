export function selectFocusableElements(tagName: "main" | "header") {
  return document.querySelectorAll(
    `${tagName} a, input, button`
  ) as NodeListOf<HTMLElement>;
}

export function focusFirstFocusableElement(tagName: "main" | "header") {
  selectFocusableElements(tagName)[0].focus();
}
