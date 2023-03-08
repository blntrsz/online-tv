import { useMemo, useEffect } from "react";

const RemoveKeyCode = {
  ArrowLeft: "37",
  ArrowUp: "38",
  ArrowRight: "39",
  ArrowDown: "40",
  Enter: "13",
  Back: "10009",
};

export function useKeyboard({
  upFn,
  rightFn,
  downFn,
  leftFn,
  enterFn,
  backFn,
}: Partial<{
  upFn: Function;
  rightFn: Function;
  downFn: Function;
  leftFn: Function;
  enterFn: Function;
  backFn: Function;
}>) {
  const arrowKeyHandlers = useMemo(() => {
    return {
      ArrowLeft: leftFn,
      ArrowRight: rightFn,
      ArrowUp: upFn,
      ArrowDown: downFn,
      Escape: backFn,
    } satisfies Record<string, Function | undefined>;
  }, []);

  const arrowKeyCodeHandlers = useMemo(() => {
    return {
      [RemoveKeyCode.ArrowLeft]: leftFn,
      [RemoveKeyCode.ArrowRight]: rightFn,
      [RemoveKeyCode.ArrowUp]: upFn,
      [RemoveKeyCode.ArrowDown]: downFn,
      [RemoveKeyCode.Enter]: enterFn,
      [RemoveKeyCode.Back]: backFn,
    } satisfies Record<string, Function | undefined>;
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const keyHandler =
        arrowKeyHandlers[e.key as keyof typeof arrowKeyHandlers];

      if (keyHandler) {
        keyHandler();
        return;
      }

      const keyCodeHandler = arrowKeyCodeHandlers[e.code];

      if (keyCodeHandler) {
        keyCodeHandler();
        return;
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
}
