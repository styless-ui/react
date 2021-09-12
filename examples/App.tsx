import React from "react";
import { ModalSection } from "./modal";
import { DropdownSection } from "./dropdown";

export const App = (): JSX.Element => {
  return (
    <section className="section">
      <h1 className="title">styleless ui</h1>
      <ModalSection />
      <DropdownSection />
    </section>
  );
};
