<h2 align="center">
  @styless-ui/react-use-doropdown
</h2>

&nbsp;

<p align="center">
  Zero Built-in Style UI React Library.
</p>

&nbsp;

<div align="center">

  <img src="https://img.shields.io/npm/l/@styless-ui/react-use-doropdown" alt="licence">

  <a href="https://www.npmjs.com/package/@styless-ui/react-use-doropdown" target="_blank">
    <img src="https://img.shields.io/npm/v/@styless-ui/react-use-doropdown.svg" alt="npm">
  </a>

  <img src="https://img.shields.io/bundlephobia/min/@styless-ui/react-use-doropdown" alt="minified size">

  <img src="https://img.shields.io/david/styless-ui/react?path=packages%2fuse-dropdown" alt="dependencies">

  <a href="https://www.npmjs.com/package/@styless-ui/react-use-doropdown">
    <img src="https://img.shields.io/npm/dt/@styless-ui/react-use-doropdown" alt="downloads">
  </a>
</div>

---

&nbsp;

## Install

### via npm

```shell
npm install @styless-ui/react-use-doropdown --save
```

### via yarn

```shell
yarn add @styless-ui/react-use-doropdown
```

&nbsp;

## Usage

```tsx
// import
import { useDropdown } from "@styless-ui/react-use-doropdown";

// in the function component
const { Dropdown, isOpen, open, close, toggle } = useDropdown(initialIsOpen);
```

### Options

- `initialIsOpen: boolean`

  - Optional
  - Defaults to `false`

### Returns

- `Dropdown: JSX.Element | null`

  - Dropdown Component

- `isOpen: boolean`

  - Dropdown Open State

- `open: () => void`

  - A function to open the Dropdown.

- `close: () => void`

  - A function to close the Dropdown.

- `toggle: () => void`
  - A function to toggle the Dropdown.

&nbsp;

## Example

```tsx
import clsx from "clsx";
import { useDropdown } from "@styless-ui/react-use-doropdown";

export const Component = () => {
  const { Dropdown, toggle, isOpen } = useDropdown();

  return (
    <section className="section">
      <h2 className="title">DropDown</h2>
      <div className={clsx(["dropdown", isOpen && "is-active"])}>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={toggle}
          >
            <span>Dropdown button</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <Dropdown className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              Dropdown item
            </a>
            <a href="#" className="dropdown-item">
              Other dropdown item
            </a>
            <a href="#" className="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" className="dropdown-item">
              Other dropdown item
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              With a divider
            </a>
          </div>
        </Dropdown>
      </div>
    </section>
  );
};
```

&nbsp;

## Licence

This project is licensed under [MIT license](https://opensource.org/licenses/MIT).

&nbsp;

## Created and maintained by

[@yuki0410\_](https://twitter.com/yuki0410_) 🇯🇵
