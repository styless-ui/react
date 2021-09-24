import { EventHandler } from "@styless-ui/doropdown";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Dropdown Props
 */
export type DropdownProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Props
 */
type Props = DropdownProps & {
  onClose?: VoidFunction;
};

/**
 * Component
 */
export const Component = ({ onClose, children, ...props }: Props): JSX.Element => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    if (onClose === undefined) {
      return;
    }
    onClose();
  }, [onClose]);

  const [handler, setHandler] = useState<EventHandler | undefined>(undefined);

  useEffect(() => {
    setHandler((prev: EventHandler | undefined): EventHandler | undefined => {
      if (elementRef.current === null) {
        return prev;
      }
      prev?.dispose();

      return new EventHandler(elementRef.current, {
        onClose: handleClose,
      });
    });
  }, [handleClose]);

  useEffect(() => {
    if (!handler) {
      return;
    }
    handler.bind();
    return () => {
      handler.dispose();
    };
  }, [handler]);

  return (
    <div {...props} ref={elementRef}>
      {children}
    </div>
  );
};
