import clsx from "clsx";
import React from "react";
import { useModal } from "../../packages/use-modal/dist/index.module";

export const ModalSection = (): JSX.Element => {
  const { Modal, open, close, isOpen } = useModal(false, {
    disableScroll: true,
    trapFocus: true,
    closeOnEsc: true,
  });

  return (
    <section
      className="section"
      style={{
        height: "120vh",
      }}
    >
      <h2 className="title">Modal</h2>
      <button className="button" onClick={open}>
        open
      </button>
      <Modal className={clsx(["modal", isOpen && "is-active"])}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={close}></button>
          </header>
          <section className="modal-card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={close}>
              Save changes
            </button>
            <button className="button" onClick={close}>
              Cancel
            </button>
          </footer>
        </div>
      </Modal>
    </section>
  );
};
