'use client'

import classNames from "classnames"
import styles from "./style.module.scss"
import Logo from "../Logo";
import { useShallow } from 'zustand/react/shallow'

import useAdminStore from "R/src/infrastructure/store/admin";
import Link from "next/link";

export interface NavHeaderProps {
  homeLink?: { path: string, name: string }
}

export default function Component({ homeLink }: NavHeaderProps) {
  const isOpen = useAdminStore((state) => state.menu.isOpen)

  return (
    <>
      <section className={classNames(styles.container, {
        [styles.menu__opened]: isOpen
      })} >
        <Logo />
        {homeLink && <Link aria-label="go to home" href={homeLink.path} className={styles.inset__link} />}

      </section >
    </>
  )
}