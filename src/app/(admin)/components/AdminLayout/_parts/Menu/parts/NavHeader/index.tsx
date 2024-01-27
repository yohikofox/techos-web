'use client'

import classNames from "classnames"
import Link from "next/link";
import useAdminStore from "R/src/infrastructure/store/admin";

import Logo from "../Logo";
import styles from "./style.module.scss"

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