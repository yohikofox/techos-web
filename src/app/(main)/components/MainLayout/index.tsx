import { Children, isValidElement } from "react";
import styles from './mainLayout.module.scss'
import Aside from "../Aside";

export enum SlotNames {
  HERO = 'hero',
}

export interface SlotProps {
  name: SlotNames
  children: any
}

const Slot = ({ name, children }: SlotProps) => {
  return (
    <>
      {name}
      {children}
    </>
  )
}

const MainLayout = ({ children }: any) => {

  const childrenArray = Children.toArray(children)

  const pageChildren = childrenArray.filter((child) => {
    return isValidElement(child) && child.type !== Slot
  });

  const slots = childrenArray.filter((child) => {
    return isValidElement(child) && child.type === Slot
  });

  const hero = slots.find((slot) => {
    return isValidElement(slot) && slot.props.name === SlotNames.HERO
  })

  return (
    <>
      {(hero && isValidElement(hero)) && hero.props.children}
      <section className={styles.container}>
        <Aside />
        {pageChildren}
      </section>
    </>
  )

};

MainLayout.Slot = Slot

export default MainLayout