import { useCallback, useState } from "react";
import type { DropdownProps } from "./component";
import { Component } from "./component";

/**
 * Dropdown hook
 */
export const useDropdown = (
  initialIsOpen = false
): {
  Dropdown: React.VFC<DropdownProps>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} => {
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);

  /**
   * open Dropdown
   */
  const open = useCallback((): void => {
    setIsOpen(true);
  }, []);

  /**
   * close Dropdown
   */
  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  /**
   * toggle Dropdown
   */
  const toggle = useCallback((): void => {
    setIsOpen((prev: boolean): boolean => {
      return !prev;
    });
  }, []);

  /**
   * Dropdown Component
   */
  const Dropdown = useCallback(
    (props: DropdownProps): JSX.Element | null => {
      if (!isOpen) {
        return null;
      }
      return <Component {...props} onClose={close} />;
    },
    [close, isOpen]
  );

  return {
    Dropdown,
    isOpen,
    open,
    close,
    toggle,
  };
};
