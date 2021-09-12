<h2 align="center">
  @styless-ui/react-use-modal
</h2>

&nbsp;

<p align="center">
  Zero Built-in Style React UI Library.
</p>

&nbsp;

<div align="center">

  <img src="https://img.shields.io/npm/l/@styless-ui/react-use-modal" alt="licence">

  <a href="https://www.npmjs.com/package/@styless-ui/react-use-modal" target="_blank">
    <img src="https://img.shields.io/npm/v/@styless-ui/react-use-modal.svg" alt="npm">
  </a>

  <img src="https://img.shields.io/bundlephobia/min/@styless-ui/react-use-modal" alt="minified size">

  <img src="https://img.shields.io/david/styless-ui/react" alt="dependencies">

  <a href="https://www.npmjs.com/package/@styless-ui/react-use-modal">
    <img src="https://img.shields.io/npm/dt/@styless-ui/react-use-modal" alt="downloads">
  </a>
</div>

---

&nbsp;

## Install

### via npm

```shell
npm install @styless-ui/react-use-modal --save
```

### via yarn

```shell
yarn add @styless-ui/react-use-modal
```

&nbsp;

## Usage

```tsx
// import
import { useModal } from "@styless-ui/react-use-modal";

// in the function component
const {
  Modal,
  isOpen,
  open,
  close,
} = useModal(initialIsOpen?, {
  disableScroll,
  trapFocus,
  closeOnEsc
});
```

### Options

- `initialIsOpen: boolean`

  - Optional
  - Defaults to `false`

- `disableScroll: boolean | BodyScrollOptions`

  - Optional
  - Defaults to `true`
  - See [BodyScrollLock Options](https://github.com/willmcpo/body-scroll-lock#options).

- `trapFocus: boolean | BodyScrollOptions`

  - Optional
  - Defaults to `true`
  - See [FocusTrap Options](https://github.com/focus-trap/focus-trap#createfocustrapelement-createoptions).

- `closeOnEsc: boolean`
  - Optional
  - Defaults to `true`

### Returns

- `Modal: JSX.Element | null`

  - Modal Component

- `isOpen: boolean`

  - Modal Open State

- `open: () => void`

  - A function to open the Modal.

- `close: () => void`
  - A function to close the Modal.

&nbsp;

## Example

```tsx
import clsx from "clsx";
import { useModal } from "@styless-ui/react-use-modal";

export const Component = () => {
  const { Modal, open, close, isOpen } = useModal();

  const modalClassName = clsx(["modal", isOpen && "is-active"]);

  return (
    <>
      <button className="button" onClick={open}>
        open
      </button>
      <Modal className={modalClassName}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              className="delete"
              aria-label="close"
              onClick={close}
            ></button>
          </header>
          <section className="modal-card-body">{/* Modal Content */}</section>
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
    </>
  );
};
```

&nbsp;

## Licence

This project is licensed under [MIT license](https://opensource.org/licenses/MIT).

&nbsp;

## Created and maintained by

[@yuki0410\_](https://twitter.com/yuki0410_) 🇯🇵
