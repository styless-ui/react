import { useCallback, useEffect, useRef } from "react";
import type { FocusableElement } from "tabbable";
import { tabbable } from "tabbable";
import type { DropdownProps } from "./hook";

/**
 * Props
 */
type Props = DropdownProps & {
  onOpen?: () => void;
  onClose?: () => void;
};

/**
 * Component
 */
export const Component = ({ onOpen: _onOpen, onClose, children, ...props }: Props): JSX.Element => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  /**
   * Handle Escape KeyDown
   */
  const handleEscapeKeyDwon = useCallback(
    (event: KeyboardEvent) => {
      if (onClose === undefined) {
        return;
      }
      event.preventDefault();
      onClose();
    },
    [onClose]
  );

  /**
   * Handle ArrowUp KeyDown
   */
  const handleArrowUpKeyDwon = useCallback((event: KeyboardEvent, container: HTMLElement) => {
    const activeElement = document.activeElement;
    const elementList = tabbable(container);

    if (activeElement === null) {
      const nextFocusElement = elementList[0];
      if (nextFocusElement === undefined) {
        return;
      }
      event.preventDefault();
      nextFocusElement.focus();
      return;
    }

    const index = elementList.findIndex((element: FocusableElement): boolean => {
      return element === activeElement;
    });

    const nextFocusElement = elementList[index - 1];

    if (nextFocusElement === undefined) {
      return;
    }
    event.preventDefault();
    nextFocusElement.focus();
  }, []);

  /**
   * Handle ArrowDown KeyDown
   */
  const handleArrowDownKeyDwon = useCallback((event: KeyboardEvent, container: HTMLElement) => {
    const activeElement = document.activeElement;
    const elementList = tabbable(container);

    if (activeElement === null) {
      const nextFocusElement = elementList[0];
      if (nextFocusElement === undefined) {
        return;
      }
      event.preventDefault();
      nextFocusElement.focus();
      return;
    }

    const index = elementList.findIndex((element: FocusableElement): boolean => {
      return element === activeElement;
    });

    const nextFocusElement = elementList[index + 1];

    if (nextFocusElement === undefined) {
      return;
    }
    event.preventDefault();
    nextFocusElement.focus();
  }, []);

  /**
   * Handle Keydown
   */
  const handleKeyDwon = useCallback(
    (event: KeyboardEvent): void => {
      if (elementRef.current === null) {
        return;
      }
      if (event.key === "Escape" || event.key === "Esc") {
        handleEscapeKeyDwon(event);
        return;
      }

      if (event.key === "ArrowUp") {
        handleArrowUpKeyDwon(event, elementRef.current);
        return;
      }
      if (event.key === "ArrowDown") {
        handleArrowDownKeyDwon(event, elementRef.current);
        return;
      }
    },
    [handleArrowDownKeyDwon, handleArrowUpKeyDwon, handleEscapeKeyDwon]
  );

  /**
   * Handle Focus
   */
  const handleFocus = useCallback(
    (event: FocusEvent): void => {
      if (elementRef.current === null) {
        return;
      }
      if (onClose === undefined) {
        return;
      }
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      let element: HTMLElement | null = event.target;
      while (element != null) {
        if (element == elementRef.current) {
          return;
        }
        element = element.parentElement;
      }
      onClose();
    },
    [onClose]
  );

  /**
   * Handle Click
   */
  const handleClick = useCallback(
    (event: FocusEvent): void => {
      if (elementRef.current === null) {
        return;
      }
      if (onClose === undefined) {
        return;
      }
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      let element: HTMLElement | null = event.target;
      while (element != null) {
        if (element == elementRef.current) {
          return;
        }
        element = element.parentElement;
      }
      onClose();
    },
    [onClose]
  );

  /**
   * Handle Focus
   */

  useEffect(() => {
    if (elementRef.current === null) {
      return;
    }

    document.addEventListener("keydown", handleKeyDwon, false);
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDwon);
      document.removeEventListener("focus", handleFocus);
      document.removeEventListener("click", handleClick);
    };
  }, [elementRef, handleClick, handleFocus, handleKeyDwon]);

  return (
    <div {...props} ref={elementRef}>
      {children}
    </div>
  );
};
