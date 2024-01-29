import { Children, isValidElement, PropsWithChildren } from "react";

import Aside from "../Aside";
import styles from "./mainLayout.module.scss";

export enum SlotNames {
  HERO = "hero",
}

export interface SlotProps extends PropsWithChildren {
  name: SlotNames;
}

const Slot = ({ name, children }: SlotProps) => {
  return (
    <>
      {name}
      {children}
    </>
  );
};

const MainLayout = ({ children }: PropsWithChildren) => {
  const childrenArray = Children.toArray(children);

  const pageChildren = childrenArray.filter((child) => {
    return isValidElement(child) && child.type !== Slot;
  });

  const slots = childrenArray.filter((child) => {
    return isValidElement(child) && child.type === Slot;
  });

  const hero = slots.find((slot) => {
    return isValidElement(slot) && slot.props.name === SlotNames.HERO;
  });

  return (
    <>
      {hero !== undefined && isValidElement(hero) && hero.props.children}
      <section className={styles.container}>
        <Aside />
        {pageChildren}
      </section>
    </>
  );
};

MainLayout.Slot = Slot;

export default MainLayout;
