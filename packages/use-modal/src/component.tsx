import type { EventHandlerOptions } from "@styless-ui/modal";
import { EventHandler } from "@styless-ui/modal";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Modal Props
 */
export type ModalProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Options
 */
export type Options = EventHandlerOptions;

/**
 * Props
 */
type Props = ModalProps & {
  options: Options;
};

/**
 * Component
 */
export const Component = ({ children, options, ...props }: Props): JSX.Element => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    const { onClose } = options;
    if (onClose === undefined) {
      return;
    }
    onClose();
  }, [options]);

  const [handler, setHandler] = useState<EventHandler | undefined>(undefined);

  useEffect(() => {
    setHandler((prev: EventHandler | undefined): EventHandler | undefined => {
      if (elementRef.current === null) {
        return prev;
      }
      prev?.dispose();

      const { onClose: _onClose, ...handleOptions } = options;

      return new EventHandler(elementRef.current, {
        ...handleOptions,
        onClose: handleClose,
      });
    });
  }, [handleClose, options]);

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
