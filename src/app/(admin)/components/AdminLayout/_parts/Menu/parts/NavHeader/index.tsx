'use client'

import classNames from "classnames"
import styles from "./style.module.scss"
import Logo from "../Logo";
import { useShallow } from 'zustand/react/shallow'

import useAdminStore from "R/src/infrastructure/store/admin";

export default function Component() {

  const { isOpen, toggle } = useAdminStore(useShallow((state) => ({
    isOpen: state.menu.isOpen,
    toggle: state.menu.toggle
  })))

  return (
    <>
      <section className={classNames(styles.container, {
        [styles.menu__opened]: isOpen
      })} >
        <Logo />
        {isOpen && "yo"}
        <button onClick={() => toggle()}>{"<"}</button>
      </section >
    </>
  )
}