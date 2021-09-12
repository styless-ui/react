import React from "react";
import clsx from "clsx";
import { useDropdown } from "../../packages/use-dropdown/dist/index.module";

export const DropdownSection = (): JSX.Element => {
  const { Dropdown, toggle, isOpen } = useDropdown();

  return (
    <section className="section">
      <h2 className="title">DropDown</h2>
      <div className={clsx(["dropdown", isOpen && "is-active"])}>
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggle}>
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
