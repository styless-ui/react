import type { BodyScrollOptions } from "body-scroll-lock";
import type { Options as FocusTrapOptions } from "focus-trap";
import { useCallback, useEffect, useState } from "react";
import { Component } from "~/component";

/**
 * Modal Options
 */
export type ModalOptions = {
  disableScroll?: boolean | BodyScrollOptions;
  trapFocus?: boolean | Omit<FocusTrapOptions, "escapeDeactivates" | "clickOutsideDeactivates">;
  closeOnEsc?: boolean;
};

/**
 * Modal Props
 */
export type ModalProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Modal hook
 */
export const useModal = (
  initialIsOpen = false,
  options: ModalOptions = {}
): {
  Modal: React.VFC<ModalProps>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
} => {
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);

  /**
   * open Modal
   */
  const open = useCallback((): void => {
    setIsOpen(true);
  }, []);

  /**
   * close Modal
   */
  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  /**
   * Modal Component
   */
  const Modal = useCallback(
    (props: ModalProps): JSX.Element | null => {
      if (!isOpen) {
        return null;
      }

      return <Component {...props} options={options} />;
    },
    [isOpen, options]
  );

  const { closeOnEsc = true } = options;

  const handleKeyDwon = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === "Escape" || event.key === "Esc") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (closeOnEsc) {
      document.addEventListener("keydown", handleKeyDwon, false);
    } else {
      document.removeEventListener("keydown", handleKeyDwon);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDwon);
    };
  }, [handleKeyDwon, closeOnEsc]);

  return {
    Modal,
    isOpen,
    open,
    close,
  };
};
