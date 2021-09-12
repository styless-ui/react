import type { BodyScrollOptions } from "body-scroll-lock";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import type { Options as FocusTrapOptions } from "focus-trap";
import FocusTrap from "focus-trap-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { ModalOptions, ModalProps } from "~/hook";

/**
 * Props
 */
type Props = ModalProps & {
  onClose?: () => void;
  options?: ModalOptions;
};

const defaultBodyScrollOptions: BodyScrollOptions = {
  reserveScrollBarGap: true,
  allowTouchMove: (element: HTMLElement | Element): boolean => {
    const ignoreDatasetKey = "bodyScrollLockIgnore";
    while (element && element !== document.body) {
      if ("dataset" in element && ignoreDatasetKey in element.dataset) {
        return true;
      }
      if (element.parentElement) element = element.parentElement;
    }
    return false;
  },
};

const defaultFocusTrapOptions: FocusTrapOptions = {
  onActivate: undefined,
  onDeactivate: undefined,
  initialFocus: undefined,
  fallbackFocus: undefined,
  returnFocusOnDeactivate: undefined,
  setReturnFocus: undefined,
  allowOutsideClick: undefined,
  escapeDeactivates: false,
  clickOutsideDeactivates: false,
};

/**
 * Component
 */
export const Component = ({ onClose, children, options = {}, ...props }: Props): JSX.Element => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Parse Options
  const { disableScroll = true, trapFocus = true, closeOnEsc = true } = options;

  const bodyScrollOptions = useMemo((): BodyScrollOptions | false => {
    if (disableScroll === true) {
      return defaultBodyScrollOptions;
    }
    return disableScroll;
  }, [disableScroll]);

  const focusTrapOptions = useMemo((): FocusTrapOptions | false => {
    if (trapFocus === true) {
      return defaultFocusTrapOptions;
    }
    if (trapFocus === false) {
      return false;
    }
    return {
      ...trapFocus,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
    };
  }, [trapFocus]);

  /**
   * Handle Escape KeyDown
   */
  const handleEscapeKeyDwon = useCallback(
    (event: KeyboardEvent) => {
      if (onClose === undefined) {
        return;
      }
      if (!closeOnEsc) {
        return;
      }
      event.preventDefault();
      onClose();
    },
    [closeOnEsc, onClose]
  );

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
    },
    [handleEscapeKeyDwon]
  );

  useEffect(() => {
    if (elementRef.current === null) {
      return;
    }

    if (bodyScrollOptions) {
      disableBodyScroll(elementRef.current, bodyScrollOptions);
    }
    document.addEventListener("keydown", handleKeyDwon, false);

    return () => {
      clearAllBodyScrollLocks();
      document.removeEventListener("keydown", handleKeyDwon);
    };
  }, [bodyScrollOptions, closeOnEsc, elementRef, handleKeyDwon]);

  return (
    <FocusTrap
      active={focusTrapOptions !== false}
      focusTrapOptions={focusTrapOptions !== false ? focusTrapOptions : undefined}
    >
      <div {...props} ref={elementRef}>
        {children}
      </div>
    </FocusTrap>
  );
};
