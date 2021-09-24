import { useCallback, useMemo, useState } from "react";
import type { ModalProps, Options } from "./component";
import { Component } from "./component";

/**
 * Modal Options
 */
export type ModalOptions = Omit<Options, "onClose">;

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

  const componentOptions = useMemo((): Options => {
    return {
      ...options,
      onClose: close,
    };
  }, [close, options]);

  /**
   * Modal Component
   */
  const Modal = useCallback(
    (props: ModalProps): JSX.Element | null => {
      if (!isOpen) {
        return null;
      }

      return <Component {...props} options={componentOptions} />;
    },
    [isOpen, componentOptions]
  );

  return {
    Modal,
    isOpen,
    open,
    close,
  };
};
