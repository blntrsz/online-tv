import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useKeyboard } from "../use-keyboard";
import { isTagFocused } from "../utils/is-tag-focused";
import { focusFirstFocusableElement, selectFocusableElements } from "../utils/focus-utils";

function upAndDownHandler() {
  if (isTagFocused("main")) {
    focusFirstFocusableElement("header");
    return;
  }
  if (isTagFocused("header")) {
    focusFirstFocusableElement("main");
    return;
  }

  focusFirstFocusableElement("main");
}

function leftRightHandler(directon: 1 | -1) {
  const handler = (tag: "main" | "header") => {
    if (isTagFocused(tag)) {
      const selectors = selectFocusableElements(tag)

      for (let index = 0; index < selectors.length; index++) {
        if (selectors[index] === document.activeElement) {
          if (selectors[index + directon]) {
            selectors[index + directon].focus();
            return;
          } else {
            if (index === 0) {
              selectors[selectors.length - 1].focus();
              return;
            }
            if (index === selectors.length - 1) {
              selectors[0].focus();
              return;
            }
          }
        }
      }
    }
  };

  handler("main");
  handler("header");
}

export function Content() {
  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector("main")?.querySelector("a")?.focus();
  }, []);

  useKeyboard({
    downFn: upAndDownHandler,
    upFn: upAndDownHandler,
    leftFn: () => leftRightHandler(-1),
    rightFn: () => leftRightHandler(+1),
    enterFn: () => {
      (document.activeElement as HTMLAnchorElement).click();
    },
    backFn: () => {
      navigate(-1);
    },
  });

  return (
    <main className="m-auto flex justify-center items-center">
      <Outlet />
    </main>
  );
}
